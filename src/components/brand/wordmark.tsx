export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      yâren
      <span className="wordmark-dot" aria-hidden="true">
        .
      </span>
    </span>
  );
}
