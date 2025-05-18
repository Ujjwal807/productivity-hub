export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Top-right blob */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform">
        <div className="h-[300px] w-[300px] rounded-full bg-purple-200/50 blur-3xl dark:bg-purple-900/30" />
      </div>

      {/* Bottom-left blob */}
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform">
        <div className="h-[300px] w-[300px] rounded-full bg-purple-200/50 blur-3xl dark:bg-purple-900/30" />
      </div>

      {/* Center blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="h-[500px] w-[500px] rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-800/20" />
      </div>

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full stroke-purple-200/20 dark:stroke-purple-800/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="100%"
            patternTransform="translate(0 -1)"
          >
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
      </svg>

      {/* Dots pattern */}
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-full w-full stroke-purple-200/30 dark:stroke-purple-800/30 [mask-image:radial-gradient(100%_100%_at_bottom_left,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="dots-pattern"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="0"
            patternTransform="translate(0 0)"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#dots-pattern)" />
      </svg>
    </div>
  )
}
