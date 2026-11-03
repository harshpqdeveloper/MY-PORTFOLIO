/** Shows a dashed "add this" note while developing. Renders nothing in a production build. */
export default function DevChip({ children }) {
  if (!import.meta.env.DEV) return null;
  return <span className="dev-chip">{children}</span>;
}
