export default function Loading() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f7f8fc',
        color: '#0f172a',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '999px',
            border: '2px solid #cbd5e1',
            borderTopColor: '#2563eb',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading DM Automation...</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
