export function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="grid-pattern absolute inset-0 bg-grid-pattern opacity-[0.08] dark:opacity-[0.12]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[500px] w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent dark:via-primary/20 blur-[150px]" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 m-auto h-[500px] w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent dark:via-primary/20 blur-[150px] opacity-50" />
    </div>
  )
}
