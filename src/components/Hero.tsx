import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { config } from '../lib/config'
import { photos } from '../lib/images'
import { EASE } from '../lib/anim'

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // scale always exceeds the vertical travel so no background edge shows
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.2])

  // headline lines rise up out of a mask
  const rise = (delay: number) =>
    reduce ? {} : { initial: { y: '115%' }, animate: { y: 0 }, transition: { duration: 0.9, ease: EASE, delay } }
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE, delay } }

  return (
    <header id="top" ref={ref} className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
      <motion.img
        src={photos.hero}
        alt="A garden events venue glowing at golden hour, tables set beneath the trees."
        className="absolute inset-0 h-full w-full object-cover"
        style={reduce ? undefined : { y, scale }}
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(13,58,53,.9) 0%, rgba(13,58,53,.45) 45%, rgba(13,58,53,.55) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 pt-[140px] pb-24 text-cream">
        <motion.p {...fadeUp(0.1)} className="eyebrow mb-5 text-sage">
          For local places worth finding
        </motion.p>

        <h1 className="mb-6 max-w-[12ch] text-balance font-serif text-[clamp(48px,8.4vw,96px)] font-[480] leading-[1.02] tracking-[-0.025em]">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span className="block" {...rise(0.15)}>
              You&rsquo;re better
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span className="block" {...rise(0.28)}>
              in person.
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...fadeUp(0.5)}
          className="mb-9 max-w-[54ch] text-pretty text-[clamp(17px,2vw,21px)] leading-[1.55]"
          style={{ color: 'rgba(251,246,240,.88)' }}
        >
          So why does the internet make you look closed, dated, or hard to trust? Let&rsquo;s fix the first thing a
          customer sees, before they ever walk in.
        </motion.p>

        <motion.div {...fadeUp(0.62)} className="flex flex-wrap items-center gap-5">
          <a href={config.contactUrl} target="_blank" rel="noreferrer" className="btn btn-lg">
            Get a free mockup <span className="arrow" aria-hidden>→</span>
          </a>
          <a
            href="#pricing"
            className="pb-0.5 text-[16px] font-medium no-underline"
            style={{ color: 'rgba(251,246,240,.85)', borderBottom: '1px solid rgba(177,183,171,.5)' }}
          >
            See what it costs ↓
          </a>
        </motion.div>

        <motion.p {...fadeUp(0.78)} className="mt-[18px] text-sm text-sage">
          Takes about 15 minutes. It&rsquo;s free. No pressure to buy.
        </motion.p>
      </div>
    </header>
  )
}
