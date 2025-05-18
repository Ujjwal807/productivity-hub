export function TechPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Circuit-like pattern */}
      <svg
        className="absolute inset-0 h-full w-full stroke-primary/15 dark:stroke-primary/20 opacity-70 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="tech-pattern" width="80" height="80" patternUnits="userSpaceOnUse" x="50%" y="100%">
            <path d="M.5 0V40H40M40 .5H80V40M40 40H80V80M40 40V80H.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#tech-pattern)" />
      </svg>

      {/* Glow spots - more diffuse */}
      <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-primary/20 dark:bg-primary/15 blur-[150px] opacity-60"></div>
      <div className="absolute -right-[10%] top-[60%] h-[500px] w-[500px] rounded-full bg-primary/20 dark:bg-primary/15 blur-[200px] opacity-50"></div>
    </div>
  )
}
