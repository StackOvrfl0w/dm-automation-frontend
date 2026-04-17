"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, LogIn, ShieldCheck } from "lucide-react";

type ConnectMode = "business" | "basic";

type ConnectResponse = {
  success: boolean;
  message?: string;
  data?: {
    url?: string;
    mode?: string;
  };
};

type ConnectedAccount = {
  _id: string;
  instagramUserId: string;
  username: string;
  accountType: "business" | "creator";
  isActive: boolean;
  connectedAt?: string;
  tokenExpiresAt?: string;
  tokenStatus?: "valid" | "expiring_soon" | "expired" | "unknown";
};

type Conversation = {
  _id: string;
  recipientInstagramId: string;
  status: "active" | "expired" | "completed";
  currentStepIndex: number;
  activeFlowId?: {
    _id: string;
    name?: string;
  } | null;
};

type WebhookEvent = {
  _id: string;
  eventType: string;
  processed: boolean;
  createdAt: string;
  error?: string;
};

const DEFAULT_API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [apiBase, setApiBase] = useState(DEFAULT_API_BASE);
  const [accessToken, setAccessToken] = useState("");
  const [isConnecting, setIsConnecting] = useState<ConnectMode | null>(null);
  const [localError, setLocalError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);

  const callbackState = useMemo(() => {
    const accountConnected = searchParams.get("accountConnected");
    const provider = searchParams.get("provider");
    const message = searchParams.get("message");

    if (!accountConnected) {
      return null;
    }

    return {
      success: accountConnected === "true",
      provider: provider || "business",
      message: message || "",
    };
  }, [searchParams]);

  const connectInstagram = async (mode: ConnectMode) => {
    try {
      setLocalError("");

      if (!accessToken.trim()) {
        setLocalError("Paste your backend access token first.");
        return;
      }

      if (!apiBase.trim()) {
        setLocalError("Enter a valid backend base URL.");
        return;
      }

      setIsConnecting(mode);

      const response = await fetch(
        `${apiBase.replace(/\/$/, "")}/api/instagram/connect?mode=${mode}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.trim()}`,
          },
        },
      );

      const payload = (await response.json()) as ConnectResponse;

      if (!response.ok || !payload?.success || !payload?.data?.url) {
        const errorMessage =
          payload?.message ||
          `Unable to generate ${mode} connect URL. Check token and backend URL.`;
        setLocalError(errorMessage);
        return;
      }

      window.location.href = payload.data.url;
    } catch (error) {
      setLocalError("Connection request failed. Verify backend URL and try again.");
    } finally {
      setIsConnecting(null);
    }
  };

  const fetchWithAuth = async (path: string) => {
    const response = await fetch(`${apiBase.replace(/\/$/, "")}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken.trim()}`,
      },
    });

    const payload = await response.json();

    if (!response.ok || !payload?.success) {
      throw new Error(payload?.message || `Request failed for ${path}`);
    }

    return payload;
  };

  const loadWorkspaceData = async () => {
    try {
      setLocalError("");

      if (!accessToken.trim()) {
        setLocalError("Paste your backend access token first.");
        return;
      }

      if (!apiBase.trim()) {
        setLocalError("Enter a valid backend base URL.");
        return;
      }

      setIsLoadingData(true);

      const [accountsPayload, conversationsPayload, eventsPayload] = await Promise.all([
        fetchWithAuth("/api/instagram/accounts"),
        fetchWithAuth("/api/conversations?limit=10&page=1"),
        fetchWithAuth("/api/webhooks/events?limit=10&page=1"),
      ]);

      setConnectedAccounts(accountsPayload?.data?.accounts || []);
      setConversations(conversationsPayload?.data?.conversations || []);
      setWebhookEvents(eventsPayload?.data?.events || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load dashboard data.";
      setLocalError(message);
    } finally {
      setIsLoadingData(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900 antialiased">
      <section className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to homepage
        </a>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="mb-8 space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2563eb]" />
              Instagram OAuth Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Connect Instagram Basic or Business account
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              This dashboard calls your protected backend endpoint, receives the OAuth URL,
              and redirects to Instagram/Facebook login. Use business mode for
              professional accounts linked to a Facebook page.
            </p>
          </div>

          {callbackState ? (
            <div
              className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                callbackState.success
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-rose-200 bg-rose-50 text-rose-900"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {callbackState.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <CircleAlert className="h-4 w-4" />
                )}
                {callbackState.success
                  ? `Connected successfully (${callbackState.provider})`
                  : `Connection failed (${callbackState.provider})`}
              </div>
              {callbackState.message ? (
                <p className="mt-1.5 text-xs sm:text-sm">Message: {callbackState.message}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-900">
                Backend API Base URL
              </span>
              <input
                type="text"
                value={apiBase}
                onChange={(event) => setApiBase(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                placeholder="https://your-ngrok-url.ngrok-free.app"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-900">
                Access Token (Bearer)
              </span>
              <textarea
                value={accessToken}
                onChange={(event) => setAccessToken(event.target.value)}
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 sm:text-sm"
                placeholder="Paste access token received from backend login response"
              />
            </label>

            {localError ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-800">
                {localError}
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => connectInstagram("business")}
                disabled={isConnecting !== null}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" />
                {isConnecting === "business"
                  ? "Generating Business URL..."
                  : "Connect Instagram Business"}
              </button>

              <button
                type="button"
                onClick={() => connectInstagram("basic")}
                disabled={isConnecting !== null}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" />
                {isConnecting === "basic"
                  ? "Generating Basic URL..."
                  : "Connect Instagram Basic"}
              </button>
            </div>

            <button
              type="button"
              onClick={loadWorkspaceData}
              disabled={isLoadingData}
              className="inline-flex items-center justify-center rounded-xl border border-[#2563eb] bg-[#eff6ff] px-4 py-3 text-sm font-semibold text-[#1d4ed8] transition-colors hover:bg-[#dbeafe] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingData ? "Loading workspace data..." : "Load Dashboard Data"}
            </button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Business flow requirements: Facebook app with Instagram Graph API,
              app roles configured, and Instagram Professional account linked to a
              Facebook page.
            </div>

            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-base font-semibold text-slate-950">Connected Accounts</h2>

              {connectedAccounts.length === 0 ? (
                <p className="text-sm text-slate-500">No connected account found yet.</p>
              ) : (
                <ul className="space-y-2">
                  {connectedAccounts.map((account) => (
                    <li
                      key={account._id}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm"
                    >
                      <div className="font-semibold text-slate-900">@{account.username}</div>
                      <div className="text-xs text-slate-600">
                        type: {account.accountType} | status: {account.isActive ? "active" : "inactive"} |
                        token: {account.tokenStatus || "unknown"}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-base font-semibold text-slate-950">Conversations</h2>

              {conversations.length === 0 ? (
                <p className="text-sm text-slate-500">No conversations captured yet.</p>
              ) : (
                <ul className="space-y-2">
                  {conversations.map((conversation) => (
                    <li
                      key={conversation._id}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm"
                    >
                      <div className="font-semibold text-slate-900">
                        recipient: {conversation.recipientInstagramId}
                      </div>
                      <div className="text-xs text-slate-600">
                        status: {conversation.status} | current step: {conversation.currentStepIndex} |
                        flow: {conversation.activeFlowId?.name || "n/a"}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
              <h2 className="text-base font-semibold text-slate-950">Webhook Debug</h2>

              {webhookEvents.length === 0 ? (
                <p className="text-sm text-slate-500">No webhook events found.</p>
              ) : (
                <ul className="space-y-2">
                  {webhookEvents.map((event) => (
                    <li
                      key={event._id}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm"
                    >
                      <div className="font-semibold text-slate-900">{event.eventType}</div>
                      <div className="text-xs text-slate-600">
                        processed: {event.processed ? "yes" : "no"} | {new Date(event.createdAt).toLocaleString()}
                      </div>
                      {event.error ? <div className="text-xs text-rose-700">error: {event.error}</div> : null}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
