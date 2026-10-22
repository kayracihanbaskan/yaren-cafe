export function ArrowIcon({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`size-5 shrink-0 ${className}`}
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
export function Rosette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="33" stroke="currentColor" strokeWidth=".8" />
      <path
        d="m50 9 10 17 20-6-6 20 17 10-17 10 6 20-20-6-10 17-10-17-20 6 6-20L9 50l17-10-6-20 20 6L50 9Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="m50 28 7 15 15 7-15 7-7 15-7-15-15-7 15-7 7-15Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="50" cy="50" r="5" stroke="currentColor" />
    </svg>
  );
}
export function Motif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
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
export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`size-5 shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M12 1v4m0 14v4M1 12h4m14 0h4M4.2 4.2l2.9 2.9m9.8 9.8 2.9 2.9M4.2 19.8l2.9-2.9m9.8-9.8 2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function CupIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 220"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="112" cy="172" rx="85" ry="19" />
        <ellipse cx="112" cy="172" rx="62" ry="11" />
        <path d="M54 91h111v28c0 32-20 50-55 50s-56-18-56-50V91Z" />
        <ellipse cx="109" cy="91" rx="55" ry="12" />
        <ellipse cx="109" cy="91" rx="44" ry="7" />
        <path d="M165 100h12c30 0 27 37 2 39h-19m5-30h11c15 0 13 20 0 20h-13" />
        <path d="m73 129 11 8 13-6 12 9 13-9 13 6 11-8" opacity=".65" />
        <path
          d="M88 59c-14-13 14-18 0-33M111 62c-16-18 18-24 0-43M136 59c-14-13 14-18 0-33"
          className="steam"
          opacity=".4"
        />
        <path d="M43 196h136m-112 8h87" opacity=".4" />
      </g>
    </svg>
  );
}
export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none">
      <path
        d="m6 6 12 12M6 18 18 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
