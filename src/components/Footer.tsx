import { config } from '../lib/config'

export function Footer() {
  return (
    <footer className="bg-ink-deep px-6 py-11 text-sage">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4">
        <p className="font-serif text-[19px] italic text-cream">{config.brand}</p>
        <p className="text-[14px]">Built by {config.founder}.</p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px]">
          <a href={config.instagram} target="_blank" rel="noreferrer" className="text-sage no-underline hover:text-cream">
            {config.instagramHandle}
          </a>
          <a href={config.facebook} target="_blank" rel="noreferrer" className="text-sage no-underline hover:text-cream">
            Facebook
          </a>
          <a href={config.mailto} className="text-sage no-underline hover:text-cream">
            {config.email}
          </a>
        </p>
      </div>
    </footer>
  )
}
