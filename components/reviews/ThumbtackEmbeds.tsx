/**
 * Thumbtack “latest review” widget in an isolated static document
 * (`/public/widgets/thumbtack-one.html`) so embed scripts run safely.
 */
export function ThumbtackEmbeds() {
  return (
    <div className="glass-panel flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-3xl p-3 sm:p-4">
      <iframe
        title="Thumbtack — latest review for Glowing Home Cleaners"
        src="/widgets/thumbtack-one.html"
        className="min-h-[18rem] w-full flex-1 rounded-2xl border-0 bg-transparent sm:min-h-[20rem] lg:min-h-[22rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
