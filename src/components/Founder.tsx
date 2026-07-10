import { motion, useReducedMotion } from 'framer-motion'
import { config } from '../lib/config'
import { photos } from '../lib/images'

const orbits = [
  { rx: 300, ry: 210, rot: -7 },
  { rx: 245, ry: 165, rot: -4 },
  { rx: 190, ry: 122, rot: -1 },
  { rx: 135, ry: 82, rot: 2 },
]

export function Founder() {
  const reduce = useReducedMotion()

  return (
    <section className="grain relative overflow-hidden bg-cream px-6 py-[170px]">
      <motion.svg
        aria-hidden="true"
        width="640"
        height="640"
        viewBox="0 0 640 640"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ transformOrigin: 'center' }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 140, repeat: Infinity, ease: 'linear' }}
      >
        {orbits.map((o, i) => (
          <motion.ellipse
            key={i}
            cx={320}
            cy={320}
            rx={o.rx}
            ry={o.ry}
            fill="none"
            stroke="#B1B7AB"
            transform={`rotate(${o.rot} 320 320)`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.7, delay: i * 0.16, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>

      <div className="relative mx-auto max-w-[820px] text-center">
        <p className="eyebrow mb-10 text-green">Why I do this</p>
        <blockquote className="text-pretty font-serif text-[clamp(26px,4vw,44px)] font-[420] italic leading-[1.4] tracking-[-0.01em] text-ink">
          The best place in town shouldn&rsquo;t lose to a worse one just because the worse one is easier to find online.
          I&rsquo;ve watched it happen. A great little spot, better than the competition in every way that matters,
          quietly losing customers because the internet made it look closed or dated or fake. That&rsquo;s the whole
          reason I started doing this.
        </blockquote>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <img src={photos.founder} alt={`Portrait of ${config.founder}.`} className="h-[88px] w-[88px] flex-none rounded-full object-cover" loading="lazy" decoding="async" />
          <div className="text-left">
            <p className="font-serif text-[19px] font-[550] text-ink">{config.founder}</p>
            <p className="mt-[2px] text-[14px]" style={{ color: 'rgba(13,58,53,.6)' }}>I build it, and I&rsquo;m the one you talk to.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
