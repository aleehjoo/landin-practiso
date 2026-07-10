import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { photos } from '../lib/images'

export function PhotoBreak() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // image drifts slower than the scroll for a real parallax feel;
  // scale exceeds the travel so no background edge shows
  const y = useTransform(scrollYProgress, [0, 1], ['-11%', '11%'])
  const scale = 1.3

  return (
    <section ref={ref} className="relative h-[58vh] min-h-[380px] overflow-hidden bg-ink">
      <motion.img
        src={photos.photoBreak}
        alt="A single table set in the garden, morning light through the leaves."
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={reduce ? undefined : { y, scale }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,58,53,.55), rgba(13,58,53,.1) 40%)' }}
      />
      <motion.p
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 bottom-10 left-6 z-[2] mx-auto max-w-[1072px] text-right font-serif text-[clamp(20px,2.6vw,28px)] font-[440] italic text-cream"
        style={{ textShadow: '0 2px 20px rgba(13,58,53,.6)' }}
      >
        Your place already does the hard part.
      </motion.p>
    </section>
  )
}
