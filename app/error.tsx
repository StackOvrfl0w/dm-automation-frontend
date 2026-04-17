"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        background: '#f7f8fc',
        color: '#0f172a',
      }}
    >
      <section
        style={{
          maxWidth: '640px',
          width: '100%',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '24px',
          background: '#fff',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: '12px' }}>
          Something went wrong
        </p>
        <h1 style={{ fontSize: '32px', margin: '0 0 12px', color: '#0f172a' }}>
          The page hit a runtime error
        </h1>
        <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
          {error.message}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ background: '#0f172a', color: '#fff', border: 0, borderRadius: '12px', padding: '12px 18px', fontWeight: 700 }}
        >
          Try again
        </button>
      </section>
    </main>
  );
}
