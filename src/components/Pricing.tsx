import { motion, useReducedMotion } from 'framer-motion'
import { config } from '../lib/config'

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₱14,500',
    sub: 'one-time, or ₱1,450/mo',
    promise: 'Get online with something clean, fast, and real.',
    plus: null as string | null,
    items: [
      'One-page site, up to 3 sections',
      'Mobile-fast, built by hand',
      'Tap to message, tap to call',
      'Set up to be found on Google',
      'Domain included for 3 years',
      '1 revision, 1 week of support',
      'Live in 5 to 7 days',
    ],
    flagship: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '₱30,500',
    sub: 'one-time, or from ₱3,050/mo',
    promise: 'The one that actually turns visitors into customers.',
    plus: 'Everything in Starter, plus:',
    items: [
      'Up to 6 sections',
      'Inquiry and booking form',
      'Reviews wall and photo gallery',
      'Google Business Profile set up',
      'Visitor analytics',
      '2 revisions, 1 month of support',
      'Live in 5 to 7 days',
    ],
    flagship: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₱52,500',
    sub: 'one-time, or ₱5,250/mo',
    promise: 'The full setup, done for you.',
    plus: 'Everything in Standard, plus:',
    items: [
      'Live booking calendar',
      'Priority build',
      'Photo and copy polish',
      'A proper pass at getting you found',
      '3 revisions, 3 months of support',
    ],
    flagship: false,
  },
]

export function Pricing() {
  const reduce = useReducedMotion()
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
  const item = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 26 } },
      }

  return (
    <section id="pricing" className="bg-sand px-6 pt-[110px] pb-[100px]">
      <div className="mx-auto max-w-[1120px]">
        <p className="eyebrow mb-4 text-green">What it costs</p>
        <h2 className="mb-[14px] font-serif text-[clamp(32px,4.6vw,52px)] font-[460] leading-[1.1] tracking-[-0.02em]">
          One price. You own it. Done.
        </h2>
        <p className="mb-[70px] max-w-[52ch] text-[18px] leading-[1.55]" style={{ color: 'rgba(13,58,53,.7)' }}>
          No monthly fees, no rented website. I build it custom, in your name, and it&rsquo;s yours to keep.
        </p>

        <motion.div
          variants={container}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-start gap-7"
        >
          {tiers.map((t) =>
            t.flagship ? (
              <motion.div
                key={t.id}
                variants={item}
                className="relative order-first rounded-[24px] bg-ink px-[30px] pt-10 pb-[34px] text-cream transition-shadow duration-300 hover:shadow-[0_52px_90px_-30px_rgba(13,58,53,.65)] md:order-none md:-translate-y-4"
                style={{ boxShadow: '0 44px 80px -30px rgba(13,58,53,.55)' }}
              >
                <span className="badge absolute -top-[14px] left-[30px] rounded-full bg-green px-4 py-[7px] text-[12.5px] font-bold uppercase tracking-[0.1em] text-cream" style={{ boxShadow: '0 10px 20px -8px rgba(13,58,53,.6)' }}>
                  Most chosen
                </span>
                <h3 className="mb-[6px] text-[15px] font-bold uppercase tracking-[0.12em] text-sage">{t.name}</h3>
                <p className="mb-[4px] font-serif text-[48px] font-[550] tracking-[-0.02em] text-cream">{t.price}</p>
                <p className="mb-[18px] text-[14px] text-sage">{t.sub}</p>
                <p className="mb-[22px] font-serif text-[18px] italic text-sage">{t.promise}</p>
                <p className="mb-3 text-[14px] font-semibold text-sage">{t.plus}</p>
                <ul className="flex flex-col gap-[11px] text-[15.5px] leading-[1.45]" style={{ color: 'rgba(251,246,240,.92)' }}>
                  {t.items.map((it) => (
                    <li key={it} className="flex gap-[10px]">
                      <span className="font-bold text-sage-2">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={config.contactUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn mt-[26px] flex w-full justify-center"
                >
                  Start with a free chat <span className="arrow" aria-hidden>→</span>
                </a>
              </motion.div>
            ) : (
              <motion.div
                key={t.id}
                variants={item}
                className="rounded-[24px] border bg-cream px-[30px] py-[34px] transition-shadow duration-300 hover:shadow-[0_34px_64px_-26px_rgba(13,58,53,.35)]"
                style={{ borderColor: 'rgba(177,183,171,.5)', boxShadow: '0 30px 60px -28px rgba(13,58,53,.2)' }}
              >
                <h3 className="mb-[6px] text-[15px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(13,58,53,.6)' }}>{t.name}</h3>
                <p className="mb-[4px] font-serif text-[44px] font-[550] tracking-[-0.02em] text-ink">{t.price}</p>
                <p className="mb-[18px] text-[14px]" style={{ color: 'rgba(13,58,53,.55)' }}>{t.sub}</p>
                <p className="mb-[22px] font-serif text-[18px] italic text-green">{t.promise}</p>
                {t.plus && <p className="mb-3 text-[14px] font-semibold" style={{ color: 'rgba(13,58,53,.55)' }}>{t.plus}</p>}
                <ul className="flex flex-col gap-[11px] text-[15.5px] leading-[1.45]" style={{ color: 'rgba(13,58,53,.85)' }}>
                  {t.items.map((it) => (
                    <li key={it} className="flex gap-[10px]">
                      <span className="font-bold text-green">✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </motion.div>

        <div className="mt-14 flex max-w-[720px] flex-col gap-[14px]">
          <p className="text-[16.5px] leading-[1.55]" style={{ color: 'rgba(13,58,53,.8)' }}>
            Any plan can be split over 4, 6, or 10 months at no extra cost. Same price, just easier to start.
          </p>
          <p className="text-[14.5px]" style={{ color: 'rgba(13,58,53,.55)' }}>
            Your domain is registered in your own name from day one, so it stays yours. No subscriptions, no strings.
          </p>
        </div>

        <div
          className="mt-9 flex items-center gap-4 rounded-[16px] border px-6 py-5"
          style={{ borderColor: 'rgba(39,97,82,.35)', background: 'rgba(39,97,82,.06)' }}
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-green" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M5 12.5l5 5 9-11" fill="none" stroke="#FBF6F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[16px] leading-[1.5] text-ink">
            <strong>Every tier:</strong> I&rsquo;ll rebuild it till you&rsquo;re happy, or you get your money back. All of it.{' '}
            <a href="#guarantee" className="font-semibold text-green">How the guarantee works ↓</a>
          </p>
        </div>
      </div>
    </section>
  )
}
