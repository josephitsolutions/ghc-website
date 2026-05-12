/**
 * Thumbtack widgets load in isolated static HTML iframes (see /public/widgets/)
 * so each script has a valid document and duplicate #tt-dynamic IDs never clash in React.
 */
export function ThumbtackEmbeds() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
      <div className="glass-panel flex min-h-0 min-w-0 flex-col overflow-hidden rounded-3xl p-3 sm:p-4">
        <iframe
          title="Thumbtack — star rating for Glowing Home Cleaners"
          src="/widgets/thumbtack-star.html"
          className="min-h-[10rem] w-full flex-1 rounded-2xl border-0 bg-transparent sm:min-h-[11rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="glass-panel flex min-h-0 min-w-0 flex-col overflow-hidden rounded-3xl p-3 sm:p-4">
        <iframe
          title="Thumbtack — latest review for Glowing Home Cleaners"
          src="/widgets/thumbtack-one.html"
          className="min-h-[18rem] w-full flex-1 rounded-2xl border-0 bg-transparent sm:min-h-[20rem] lg:min-h-[22rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
