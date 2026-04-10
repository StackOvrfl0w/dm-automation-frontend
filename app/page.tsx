"use client";

import { Manrope } from "next/font/google";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronDown,
  Globe,
  Menu,
  Megaphone,
  MessageCircleMore,
  MessageSquare,
  Play,
  Send,
  ShieldCheck,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { type ComponentType, useEffect, useMemo, useState } from "react";

const manrope = Manrope({ subsets: ["latin"] });

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const logos = [
  "Maven Commerce",
  "Peak Studio",
  "Nexa Fitness",
  "Horizon Dental",
  "Aster Agency",
  "Urban Bloom",
];

const features: Feature[] = [
  {
    title: "Keyword Trigger Replies",
    description:
      "Instantly respond when someone DMs a keyword from your reels, stories, or ads.",
    icon: Zap,
  },
  {
    title: "Story Reply Automation",
    description:
      "Automatically answer reactions and replies on stories without manual follow-up.",
    icon: MessageCircleMore,
  },
  {
    title: "Comment-to-DM Funnels",
    description:
      "Turn post comments into direct messages that continue the buying conversation.",
    icon: Send,
  },
  {
    title: "Lead Capture Sequences",
    description:
      "Collect names, emails, and phone numbers inside DM flows built for conversion.",
    icon: Users,
  },
  {
    title: "Broadcast Campaigns",
    description:
      "Send high-intent promotions and updates to segmented DM subscriber lists.",
    icon: Megaphone,
  },
  {
    title: "AI Smart Replies",
    description:
      "Use context-aware responses that sound natural while matching your brand voice.",
    icon: Bot,
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your Instagram account",
    description:
      "Securely connect your business or creator account in minutes. Once connected, DM Automation starts listening for triggers immediately.",
  },
  {
    number: "02",
    title: "Build your automation flows visually",
    description:
      "Design DM paths with a drag-and-logic builder for keywords, comments, and story reactions. Launch flows without writing code.",
  },
  {
    number: "03",
    title: "Watch leads and replies come in automatically",
    description:
      "Every trigger runs your funnel in real time, so prospects get answers, offers, and next steps 24/7. Your team jumps in only when needed.",
  },
];

const metrics = [
  { value: "3x", label: "faster response" },
  { value: "40%", label: "more leads captured" },
  { value: "10min", label: "setup" },
  { value: "24/7", label: "automated" },
];

const pricing: PricingPlan[] = [
  {
    name: "Starter",
    price: "$49/mo",
    description:
      "For solo creators and small businesses launching their first DM funnels.",
    features: [
      "Up to 5 active automation flows",
      "1,500 DM contacts per month",
      "1 Instagram account",
      "Basic keyword and story triggers",
      "Email support",
    ],
    cta: "Start Starter",
  },
  {
    name: "Growth",
    price: "$99/mo",
    description:
      "For scaling brands that need more funnels, contacts, and team collaboration.",
    features: [
      "Up to 20 active automation flows",
      "10,000 DM contacts per month",
      "3 team seats",
      "Comment funnels and broadcasts",
      "Priority support",
    ],
    cta: "Start Growth",
    popular: true,
  },
  {
    name: "Agency",
    price: "$249/mo",
    description:
      "For agencies managing multiple client accounts and advanced automation logic.",
    features: [
      "Unlimited automation flows",
      "50,000 DM contacts per month",
      "10 Instagram accounts",
      "Advanced AI smart replies",
      "Dedicated success manager",
    ],
    cta: "Book Agency Demo",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "We cut DM response time from hours to seconds. Our team now focuses on closing, not typing the same replies all day.",
    name: "Samantha Lee",
    role: "Ecommerce founder",
  },
  {
    quote:
      "Comment-to-DM funnels became our highest converting lead source in under two weeks. Client retention improved immediately.",
    name: "Marcus Rivera",
    role: "Marketing agency owner",
  },
  {
    quote:
      "Automated follow-ups doubled my consult bookings. Revenue became predictable because every inbound DM entered a real funnel.",
    name: "Daniel Brooks",
    role: "Fitness coach",
  },
];

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most teams connect Instagram and launch their first DM flow in under 10 minutes. The visual builder includes templates so you can go live quickly.",
  },
  {
    q: "Is DM Automation compliant with Instagram policies?",
    a: "Yes. DM Automation is built around Instagram-approved automation behavior and timing. We continuously update guardrails as platform rules evolve.",
  },
  {
    q: "Does it work with business and creator accounts?",
    a: "Yes. You can connect both Instagram Business and Creator accounts, then configure triggers and routing based on your workflow.",
  },
  {
    q: "What does the free trial include?",
    a: "Your 14-day trial includes full access to core automation features, including keyword triggers, story replies, and DM funnels, with no credit card required.",
  },
  {
    q: "Can it handle multiple Instagram accounts?",
    a: "Yes. Multi-account support is available on Growth and Agency plans, making it easy to run automation across brands or clients from one dashboard.",
  },
  {
    q: "Do I need coding skills to use it?",
    a: "No coding is needed. Flows are built visually, and prebuilt templates help you launch quickly while still allowing deep customization.",
  },
];

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const items = document.querySelectorAll("[data-reveal]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const starIcons = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#2563eb] text-[#2563eb]" />
      )),
    [],
  );

  return (
    <main
      className={`${manrope.className} min-h-screen bg-[#f7f8fc] text-[#0f172a] antialiased`}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-slate-200 bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="flex items-center gap-2 text-base font-semibold tracking-wide"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] text-white shadow-sm">
              <Globe className="h-4 w-4" />
            </span>
            DM Automation
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#final-cta"
              className="inline-flex items-center rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b]"
            >
              Book a Demo
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-900 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200 bg-white px-6 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#final-cta"
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <section
        className="relative flex min-h-screen items-center overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_40%),linear-gradient(180deg,#fbfcfe_0%,#f7f8fc_100%)] pt-28"
        id="top"
      >
        <div className="pointer-events-none absolute inset-x-0 top-24 h-72 bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_65%)]" />
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-16 lg:grid-cols-2 lg:items-center">
          <div data-reveal className="reveal space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2563eb]" />
              Built for serious Instagram sales teams
            </p>

            <div className="space-y-6">
              <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Turn Instagram DMs into a predictable revenue channel.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                DM Automation captures leads, responds instantly, and runs
                complete DM funnels directly inside Instagram. Convert every
                comment, story reaction, and message into a structured sales
                conversation without adding headcount.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#pricing"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1e293b]"
              >
                Start Free Trial
              </a>
              <a
                href="#live-demo"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-slate-400"
              >
                <Play className="h-4 w-4" />
                See It Live
              </a>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-950">
                  1,200+ businesses
                </span>{" "}
                already automating Instagram DMs
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{starIcons}</div>
                <span className="text-sm font-semibold text-slate-950">
                  4.9/5
                </span>
              </div>
            </div>
          </div>

          <div data-reveal className="reveal delay-150">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Instagram DM Flow
                  </p>
                  <p className="text-xs text-slate-500">Keyword: PRICELIST</p>
                </div>
                <span className="rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-semibold text-[#2563eb]">
                  Live
                </span>
              </div>

              <div className="space-y-3">
                <div className="max-w-[82%] rounded-xl rounded-bl-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  Hey, can I get your pricing details?
                </div>

                <div className="typing-indicator max-w-[55%] rounded-xl rounded-br-sm bg-[#0f172a] px-4 py-3 text-sm text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>

                <div className="auto-message auto-message-1 ml-auto max-w-[82%] rounded-xl rounded-tr-sm bg-[#0f172a] px-4 py-3 text-sm text-white">
                  Perfect. Sending our packages now. Which service are you
                  interested in first?
                </div>

                <div className="auto-message auto-message-2 ml-auto max-w-[82%] rounded-xl rounded-tr-sm bg-[#0f172a] px-4 py-3 text-sm text-white">
                  Also, what email should I send the full rate card to?
                </div>

                <div className="auto-message auto-message-3 ml-auto max-w-[82%] rounded-xl rounded-tr-sm bg-[#0f172a] px-4 py-3 text-sm text-white">
                  Done. A strategist can follow up in the next 10 minutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Trusted by teams at
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-end">
            {logos.map((logo) => (
              <span
                key={logo}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28"
      >
        <div data-reveal className="reveal mb-14 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
            Features
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Everything you need to automate Instagram DMs
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                data-reveal
                className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-xl font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-white py-24 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div data-reveal className="reveal mb-14 max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
              How It Works
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              From inbound message to qualified lead
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                data-reveal
                className="reveal relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <p className="mb-4 text-5xl font-bold text-[#2563eb]/20">
                  {step.number}
                </p>
                <h3 className="mb-3 text-xl font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="live-demo"
        className="border-b border-slate-200 bg-[#0f172a] py-24 text-white sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div data-reveal className="reveal">
            <div className="mx-auto w-full max-w-md rounded-[2.5rem] border border-white/10 bg-white/5 p-3 shadow-[0_35px_90px_rgba(15,23,42,0.35)]">
              <div className="rounded-[2rem] border border-white/10 bg-[#0b1220] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#93c5fd]">
                      <MessageSquare className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        DM Automation
                      </p>
                      <p className="text-xs text-white/60">
                        Flow Builder Preview
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-white/50">Now</span>
                </div>

                <div className="space-y-2 rounded-xl border border-white/10 bg-[#0f172a] p-3">
                  <FlowNode
                    title="Trigger"
                    subtitle="Comment contains: GUIDE"
                    accent="bg-[#2563eb]"
                  />
                  <FlowNode
                    title="Auto DM"
                    subtitle="Send guide + qualifying question"
                    accent="bg-[#22c55e]"
                  />
                  <FlowNode
                    title="Lead Capture"
                    subtitle="Collect email + phone"
                    accent="bg-[#f59e0b]"
                  />
                  <FlowNode
                    title="Team Handoff"
                    subtitle="Assign to closer if high intent"
                    accent="bg-[#06b6d4]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div data-reveal className="reveal space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#93c5fd]">
              See the automation in action.
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Build DM systems that run while your team focuses on sales
            </h2>
            <ul className="space-y-4 text-base text-white/80">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-[#93c5fd]" />
                Trigger workflows from comments, story replies, and incoming
                keywords
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-[#93c5fd]" />
                Route leads by intent score and instantly notify your sales team
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-[#93c5fd]" />
                Capture contact info directly in DM and sync to your CRM process
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 text-[#93c5fd]" />
                Track response time, completion rate, and conversion per
                automation
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              data-reveal
              className="reveal"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <p className="text-4xl font-bold text-slate-950 sm:text-5xl">
                {metric.value}
              </p>
              <p className="mt-2 text-base text-slate-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28"
      >
        <div data-reveal className="reveal mb-14 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
            Pricing
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Simple pricing for teams scaling on Instagram
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <article
              key={plan.name}
              data-reveal
              className={`reveal relative rounded-xl border p-7 transition-colors duration-300 ${
                plan.popular
                  ? "border-[#2563eb] bg-[#eff6ff] shadow-[0_20px_50px_rgba(37,99,235,0.08)]"
                  : "border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)] hover:border-[#2563eb]"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {plan.popular ? (
                <span className="absolute right-6 top-6 rounded-full bg-[#2563eb] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#2563eb]">
                {plan.name}
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-950">
                {plan.price}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-[#2563eb]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#final-cta"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                  plan.popular
                    ? "bg-[#0f172a] text-white hover:bg-[#1e293b]"
                    : "border border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-24 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div data-reveal className="reveal mb-14 max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
              Testimonials
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Results from teams selling in Instagram DMs
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                data-reveal
                className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="mb-4 flex gap-1">
                  {starIcons.map((icon, i) => (
                    <span key={`${item.name}-${i}`}>{icon}</span>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-slate-700">
                  “{item.quote}”
                </p>
                <p className="mt-6 text-sm font-semibold text-slate-950">
                  {item.name}
                </p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28"
      >
        <div data-reveal className="reveal mb-14 max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
            FAQ
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Answers before you launch
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <article
                key={item.q}
                data-reveal
                className="reveal rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left"
                  onClick={() =>
                    setOpenFaq((prev) => (prev === index ? null : index))
                  }
                >
                  <span className="text-base font-semibold text-slate-950 sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-base leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="final-cta"
        className="border-y border-slate-200 bg-[#0f172a] py-20 text-white"
      >
        <div
          data-reveal
          className="reveal mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
        >
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Start automating your DMs today
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            No credit card required. 14-day free trial.
          </p>
          <a
            href="#pricing"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#"
              className="flex items-center gap-2 text-base font-semibold tracking-wide"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f172a] text-white">
                <Globe className="h-4 w-4" />
              </span>
              DM Automation
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Instagram DM Automation platform for businesses that want faster
              responses, better lead capture, and measurable revenue impact.
            </p>
            <div className="mt-5 flex items-center gap-3 text-slate-600">
              <a
                href="#"
                aria-label="Website"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition-colors hover:border-[#2563eb] hover:text-slate-950"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Messages"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition-colors hover:border-[#2563eb] hover:text-slate-950"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Company"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition-colors hover:border-[#2563eb] hover:text-slate-950"
              >
                <Building2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Product"
            links={[
              "Features",
              "How It Works",
              "Pricing",
              "Integrations",
              "Changelog",
            ]}
          />
          <FooterColumn
            title="Company"
            links={["About", "Customers", "Careers", "Contact", "Book Demo"]}
          />
          <FooterColumn
            title="Legal"
            links={[
              "Privacy",
              "Terms",
              "Data Processing",
              "Security",
              "Cookies",
            ]}
          />
        </div>
        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-slate-200 px-6 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} DM Automation. All rights reserved.
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          cursor: default;
        }

        a,
        button {
          cursor: pointer;
        }

        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 700ms ease,
            transform 700ms ease;
        }

        .reveal-in {
          opacity: 1;
          transform: translateY(0);
        }

        .typing-indicator {
          opacity: 0;
          animation: typingCycle 6s infinite;
        }

        .dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          animation: dotPulse 1s infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 120ms;
        }

        .dot:nth-child(3) {
          animation-delay: 240ms;
        }

        .auto-message {
          opacity: 0;
          transform: translateY(8px);
        }

        .auto-message-1 {
          animation: messageOne 6s infinite;
        }

        .auto-message-2 {
          animation: messageTwo 6s infinite;
        }

        .auto-message-3 {
          animation: messageThree 6s infinite;
        }

        @keyframes typingCycle {
          0%,
          12% {
            opacity: 0;
            transform: translateY(8px);
          }
          14%,
          32% {
            opacity: 1;
            transform: translateY(0);
          }
          34%,
          100% {
            opacity: 0;
            transform: translateY(-4px);
          }
        }

        @keyframes messageOne {
          0%,
          30% {
            opacity: 0;
            transform: translateY(8px);
          }
          35%,
          56% {
            opacity: 1;
            transform: translateY(0);
          }
          58%,
          100% {
            opacity: 0;
            transform: translateY(-4px);
          }
        }

        @keyframes messageTwo {
          0%,
          48% {
            opacity: 0;
            transform: translateY(8px);
          }
          53%,
          72% {
            opacity: 1;
            transform: translateY(0);
          }
          74%,
          100% {
            opacity: 0;
            transform: translateY(-4px);
          }
        }

        @keyframes messageThree {
          0%,
          66% {
            opacity: 0;
            transform: translateY(8px);
          }
          71%,
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          92%,
          100% {
            opacity: 0;
            transform: translateY(-4px);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

function FlowNode({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
      <span className={`mt-1 h-2.5 w-2.5 rounded-full ${accent}`} />
      <div>
        <p className="text-xs font-semibold text-white/90">{title}</p>
        <p className="text-xs text-white/60">{subtitle}</p>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-slate-600 transition-colors hover:text-slate-950"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
