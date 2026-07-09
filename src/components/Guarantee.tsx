import { motion, useReducedMotion } from 'framer-motion'

export function Guarantee() {
  const reduce = useReducedMotion()
  return (
    <section id="guarantee" className="bg-cream px-6 py-[130px]">
      <div className="mx-auto max-w-[680px] text-center">
        <span
          className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green"
          style={{ boxShadow: '0 20px 40px -16px rgba(39,97,82,.6)' }}
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <motion.path
              d="M5 12.5l5 5 9-11"
              fill="none"
              stroke="#FBF6F0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.15 }}
            />
          </svg>
        </span>
        <h2 className="mb-[22px] font-serif text-[clamp(32px,4.6vw,52px)] font-[460] leading-[1.1] tracking-[-0.02em]">
          If you don&rsquo;t love it, you don&rsquo;t keep it.
        </h2>
        <p className="text-pretty text-[clamp(17px,2vw,20px)] leading-[1.6]" style={{ color: 'rgba(13,58,53,.75)' }}>
          I&rsquo;ll rebuild it until you&rsquo;re happy, or I&rsquo;ll give your money back in full. The risk is mine,
          not yours.
        </p>
      </div>
    </section>
  )
}
