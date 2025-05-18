export function AbstractShapes({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Abstract shape 1 */}
      <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-purple-300/40 to-pink-300/40 blur-xl dark:from-purple-700/30 dark:to-pink-700/30" />

      {/* Abstract shape 2 */}
      <div className="absolute bottom-1/3 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-purple-400/30 to-blue-300/30 blur-xl dark:from-purple-600/20 dark:to-blue-600/20" />

      {/* Abstract shape 3 */}
      <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-indigo-300/30 to-purple-300/30 blur-xl dark:from-indigo-700/20 dark:to-purple-700/20" />

      {/* Abstract shape 4 */}
      <div className="absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-gradient-to-l from-purple-300/30 to-pink-300/30 blur-xl dark:from-purple-700/20 dark:to-pink-700/20" />
    </div>
  )
}
