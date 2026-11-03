/**
 * Abstract project artwork, used where no real screenshot exists. Deterministic from `seed`.
 * It is decorative only and is never presented as a screenshot.
 */
export default function ArtThumb({ seed = 1 }) {
  const cx = 60 + ((seed * 47) % 80);
  const cy = 30 + ((seed * 29) % 50);
  const rings = Array.from({ length: 9 }, (_, i) => i);

  return (
    <svg className="art-thumb" viewBox="0 0 200 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {rings.map((i) => (
        <circle key={i} cx={cx} cy={cy} r={8 + i * 9} fill="none" stroke="rgba(242,239,235,0.12)" strokeWidth="0.6" />
      ))}
      <line x1="0" y1={20 + (seed % 5) * 14} x2="200" y2={(seed * 13) % 110} stroke="#e0283a" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="2.2" fill="#e0283a" />
    </svg>
  );
}
