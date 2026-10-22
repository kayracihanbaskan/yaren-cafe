export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="arrow-icon"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Motif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`motif ${className}`}
      viewBox="0 0 64 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 16 12-12 12 12-12 12L3 16Zm22 0L37 4l12 12-12 12-12-12Zm22 0 12-12M47 16l12 12"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg
      className="tiny-sun"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M12 1v5m0 12v5M1 12h5m12 0h5M4.2 4.2l3.5 3.5m8.6 8.6 3.5 3.5M4.2 19.8l3.5-3.5m8.6-8.6 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
