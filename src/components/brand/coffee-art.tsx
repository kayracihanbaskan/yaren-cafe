type ArtProps = { className?: string };

export function Spark({ className = "" }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m41 3 7 24 24-8-17 20 21 14-27-2-7 26-9-25-27 6 19-19L6 24l27 4L41 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Bean({ className = "" }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 65 85"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M54 14C36-4 8 14 5 39c-4 27 11 45 30 39 22-7 34-45 19-64Z"
        fill="currentColor"
      />
      <path
        d="M46 12C20 25 42 53 19 73"
        stroke="var(--cream)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M51 23c6 14-3 38-15 45"
        stroke="var(--cream)"
        strokeWidth="1"
        opacity=".4"
      />
    </svg>
  );
}
export function CezveArt({ className = "" }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M51 91c-3 23-15 44-15 64 0 33 93 37 96 1 1-22-16-48-17-64"
          fill="var(--copper)"
        />
        <path d="m50 91-9-12c24 13 50-1 74 9l7 13M116 103l49-63 9 7-48 69" />
        <path d="M53 123c11 5 44 6 61-1M48 144c20 8 49 7 72 0M65 46c-19-22 19-25 5-43M88 61c-18-20 21-25 7-46" />
        <path d="m65 162 7-9 9 9 9-8 9 8" />
        <ellipse cx="82" cy="188" rx="66" ry="5" />
      </g>
    </svg>
  );
}
export function FriendshipArt({ className = "" }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 220"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="rotate(-12 85 140)">
          <ellipse cx="80" cy="178" rx="64" ry="12" />
          <path
            d="M33 104h86v26c0 32-20 44-43 44s-43-16-43-44Z"
            fill="var(--cream)"
          />
          <ellipse cx="76" cy="105" rx="43" ry="9" fill="var(--copper)" />
          <path d="M120 114c44-15 39 43-9 34M56 135l9 6m22-6 9-6m-31 21q13 10 25-3" />
        </g>
        <g transform="rotate(12 215 140)">
          <ellipse cx="216" cy="178" rx="64" ry="12" />
          <path
            d="M174 104h86v26c0 32-20 44-43 44s-43-16-43-44Z"
            fill="var(--cream)"
          />
          <ellipse cx="217" cy="105" rx="43" ry="9" fill="var(--copper)" />
          <path d="M174 114c-44-15-39 43 9 34M196 133l8 5m22-4 8-5m-30 20q13 10 25-3" />
        </g>
        <path d="M68 75c-19-19 17-22 5-39m144 39c-19-19 17-22 5-39m-82 9 12-19 9 20 21 5-20 10-9 24-8-24-20-7 15-9Z" />
      </g>
    </svg>
  );
}
export function SteamArt({ className = "" }: ArtProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M62 191C-4 130 151 117 83 66 41 34 65 4 107 7" />
        <path d="M95 186C34 127 181 131 121 74 85 40 107 23 143 26" />
      </g>
    </svg>
  );
}
export function FortySeal({
  className = "",
  english = false,
}: ArtProps & { english?: boolean }) {
  return (
    <div className={`forty-seal ${className}`} aria-hidden="true">
      <span>{english ? "A CUP OF COFFEE" : "BİR FİNCAN KAHVE"}</span>
      <strong>
        40<span>{english ? "YEARS" : "YIL"}</span>
      </strong>
      <span>{english ? "OF FRIENDSHIP" : "HATIRI VAR"}</span>
    </div>
  );
}
