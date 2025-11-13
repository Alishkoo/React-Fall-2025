export default function ErrorBox({ children }) {
  return (
    <div style={{ border: "1px solid #e3342f", background: "#fff5f5", padding: 12, color: "#a11" }}>
      {children}
    </div>
  );
}
