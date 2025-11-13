export default function Spinner() {
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div className="loader">Loading...</div>
      <style>{`.loader{display:inline-block;padding:8px 12px;border-radius:6px;background:#f0f0f0;color:#222;font-weight:600}`}</style>
    </div>
  );
}
