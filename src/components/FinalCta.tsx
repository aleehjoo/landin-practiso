import { motion, useReducedMotion } from 'framer-motion'
import { config } from '../lib/config'

export function FinalCta() {
  const reduce = useReducedMotion()
  return (
    <>
      <div aria-hidden="true" className="h-[180px] bg-cream" />
      <section className="bg-ink px-6 py-[130px] text-cream">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.h2
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-serif text-[clamp(38px,6vw,64px)] font-[460] leading-[1.05] tracking-[-0.02em]"
          >
            Let&rsquo;s just talk.
          </motion.h2>
          <p className="mx-auto mb-10 max-w-[46ch] text-pretty text-[clamp(17px,2vw,20px)] leading-[1.6]" style={{ color: 'rgba(251,246,240,.85)' }}>
            I&rsquo;ll make you a real mockup of your own business, for free, before you decide anything. If it&rsquo;s not
            for you, no hard feelings. You lose nothing by asking.
          </p>
          <a href={config.contactUrl} target="_blank" rel="noreferrer" className="btn btn-lg">
            Get a free mockup <span className="arrow" aria-hidden>→</span>
          </a>
          <p className="mt-5 text-[14px] text-sage">Free. About 15 minutes. No pressure to buy.</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px]">
            <a href={config.instagram} target="_blank" rel="noreferrer" className="text-sage no-underline hover:text-cream">
              Instagram {config.instagramHandle}
            </a>
            <a href={config.facebook} target="_blank" rel="noreferrer" className="text-sage no-underline hover:text-cream">
              Facebook
            </a>
            <a href={config.mailto} className="text-sage no-underline hover:text-cream">
              {config.email}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
