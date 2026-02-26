export default function ScrollCard({ children, className = "" }) {
  return <div className={`scroll-card p-6 ${className}`}>{children}</div>;
}
