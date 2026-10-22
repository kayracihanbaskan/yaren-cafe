export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m17 11 7-5 7 5M12 18l12 11 12-11M24 29v12M13 41h22"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 29c0 7.2 5.8 12 13 12s13-4.8 13-12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
