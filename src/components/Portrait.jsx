import { profile } from '../data/profile.js';
import DevChip from './DevChip.jsx';

// Drop a photo named portrait.webp / .png / .jpg into src/assets/profile/ and it is used automatically.
const portraitFiles = import.meta.glob('../assets/profile/portrait.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const portraitSrc = Object.values(portraitFiles)[0];

export default function Portrait({ className = '' }) {
  return (
    <figure className={`portrait ${className}`}>
      {portraitSrc ? (
        <img src={portraitSrc} alt={profile.portraitAlt} loading="eager" decoding="async" />
      ) : (
        <div className="portrait-art" role="img" aria-label="H monogram artwork">
          <svg viewBox="0 0 400 500" aria-hidden="true" focusable="false">
            {[40, 70, 100, 130, 160, 190, 220].map((r) => (
              <circle key={r} cx="200" cy="235" r={r} fill="none" stroke="rgba(242,239,235,0.07)" strokeWidth="1" />
            ))}
            <text
              x="196"
              y="345"
              textAnchor="middle"
              fontFamily="Anton, Impact, sans-serif"
              fontSize="300"
              fill="none"
              stroke="rgba(242,239,235,0.28)"
              strokeWidth="1.4"
            >
              H
            </text>
            <rect x="282" y="318" width="26" height="27" fill="#e0283a" />
            <line x1="32" y1="440" x2="368" y2="440" stroke="#e0283a" strokeWidth="1" opacity="0.6" />
            <text x="32" y="468" fontFamily="Manrope Variable, Manrope, sans-serif" fontSize="12" letterSpacing="3" fill="#a39f9a">
              SOFTWARE · AUTOMATION · WEB
            </text>
          </svg>
          <DevChip>Add a photo: src/assets/profile/portrait.webp</DevChip>
        </div>
      )}
    </figure>
  );
}
