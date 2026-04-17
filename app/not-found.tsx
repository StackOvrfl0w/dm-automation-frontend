export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', fontFamily: 'Arial, sans-serif', background: '#f7f8fc', color: '#0f172a' }}>
      <section style={{ maxWidth: '640px', width: '100%', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', background: '#fff' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563eb', marginBottom: '12px' }}>
          Not found
        </p>
        <h1 style={{ fontSize: '32px', margin: '0 0 12px', color: '#0f172a' }}>
          Page not found
        </h1>
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          The route you requested does not exist.
        </p>
      </section>
    </main>
  );
}
