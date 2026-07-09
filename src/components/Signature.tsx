import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { photos } from '../lib/images'

function DeadCard() {
  return (
    <div className="flex h-full flex-col bg-[#ECEAE4] text-left">
      <div className="flex h-11 items-center gap-2 bg-[#DDDAD2] px-4">
        <div className="h-[10px] w-[90px] rounded-[5px] bg-sage" />
      </div>
      <div className="flex h-[175px] items-center justify-center" style={{ background: 'linear-gradient(135deg,#D7D4CC,#C9C6BE)' }}>
        <span className="text-[13px] font-medium text-[#8E948A]">3 photos · from 2019</span>
      </div>
      <div className="flex flex-col gap-[14px] px-4 py-[18px]">
        <div className="h-[14px] w-[70%] rounded-[7px] bg-[#C9C6BE]" />
        <p className="text-[14px] text-[#8E948A]">Hours: unknown</p>
        <p className="text-[14px] text-[#8E948A]">Prices: no info</p>
        <p className="text-[14px] text-[#8E948A]">Last post: 2021</p>
        <div className="h-[10px] w-[55%] rounded-[5px] bg-[#D7D4CC]" />
        <div className="h-[10px] w-[80%] rounded-[5px] bg-[#D7D4CC]" />
        <p className="mt-[10px] font-serif text-[15px] italic text-[#A5A399]">&ldquo;Is this place even still open&hellip;?&rdquo;</p>
      </div>
    </div>
  )
}

function AliveCard() {
  return (
    <div className="flex h-full flex-col bg-cream text-left">
      <div className="relative h-[195px]" style={{ background: 'linear-gradient(135deg,var(--color-green),var(--color-ink))' }}>
        <img src={photos.phone} alt="The garden venue set for an evening, lit and inviting." className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-col gap-[10px] p-4">
        <p className="font-serif text-[19px] font-[550] text-ink">Hardin Verde · Garden Events</p>
        <p className="flex items-center gap-[7px] text-[14px] font-semibold text-green">
          <span className="inline-block h-2 w-2 rounded-full bg-green" />
          Open today · until 10 PM
        </p>
        <p className="text-[14px]" style={{ color: 'rgba(13,58,53,.7)' }}>Packages from ₱45,000 · see rates</p>
        <p className="text-[13.5px]" style={{ color: 'rgba(13,58,53,.6)' }}>Brgy. San Isidro, Tayabas · Directions</p>
        <div className="flex flex-wrap gap-2">
          {['Gallery', 'Rates', 'Book a date'].map((t) => (
            <span key={t} className="rounded-full border px-3 py-[5px] text-[12.5px] font-semibold text-green" style={{ borderColor: 'rgba(39,97,82,.35)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-[6px] rounded-[12px] bg-green py-[13px] text-center text-[15px] font-semibold text-cream" style={{ boxShadow: '0 10px 26px -8px rgba(39,97,82,.65)' }}>
          Message us
        </div>
        <p className="text-center text-[12.5px]" style={{ color: 'rgba(13,58,53,.55)' }}>Replies within the day</p>
      </div>
    </div>
  )
}

export function Signature() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [after, setAfter] = useState(false)
  const [dir, setDir] = useState(1)
  const touched = useRef(false)

  // auto-swipe to "after" the first time it scrolls into view
  useEffect(() => {
    if (!inView || touched.current) return
    if (reduce) {
      setAfter(true)
      return
    }
    const t = setTimeout(() => {
      if (!touched.current) {
        setDir(1)
        setAfter(true)
      }
    }, 950)
    return () => clearTimeout(t)
  }, [inView, reduce])

  const go = (next: boolean) => {
    touched.current = true
    setDir(next ? 1 : -1)
    setAfter(next)
  }

  const variants = {
    enter: (d: number) => ({ x: reduce ? 0 : d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d: number) => ({ x: reduce ? 0 : d > 0 ? '-100%' : '100%' }),
  }

  return (
    <section className="bg-cream px-6 pt-10 pb-[110px]">
      <div className="mx-auto max-w-[780px] text-center">
        <p className="mb-10 text-[16px] font-medium" style={{ color: 'rgba(13,58,53,.6)' }}>
          This is what they saw when they looked you up:
        </p>

        <div
          ref={ref}
          className="relative mx-auto h-[500px] w-[min(330px,82vw)] rounded-[44px] bg-ink p-3 transition-shadow duration-700"
          style={{ boxShadow: after ? '0 44px 90px -28px rgba(39,97,82,.5)' : '0 40px 80px -30px rgba(13,58,53,.45)' }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#EFEDE8]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={after ? 'after' : 'before'}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 34 }}
                className="absolute inset-0"
              >
                {after ? <AliveCard /> : <DeadCard />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-7 inline-flex gap-[6px] rounded-full border p-[5px]" style={{ borderColor: 'rgba(177,183,171,.6)' }}>
          {(['before', 'after'] as const).map((k) => {
            const active = (k === 'after') === after
            return (
              <button
                key={k}
                type="button"
                onClick={() => go(k === 'after')}
                className="min-h-10 cursor-pointer rounded-full px-5 py-2 text-[14px] font-semibold transition-colors duration-300"
                style={{
                  background: active ? (k === 'after' ? 'var(--color-green)' : 'var(--color-ink)') : 'transparent',
                  color: active ? 'var(--color-cream)' : 'var(--color-ink)',
                }}
              >
                {k === 'before' ? 'Before' : 'After'}
              </button>
            )
          })}
        </div>
        <p className="mt-[14px] text-[14px]" style={{ color: 'rgba(13,58,53,.55)' }}>Same business. Five days later.</p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-[90px] max-w-[640px] text-left"
        >
          <p className="text-pretty font-serif text-[clamp(22px,3vw,30px)] font-[440] italic leading-[1.42] text-green">
            You&rsquo;re not losing people because you aren&rsquo;t good enough. You&rsquo;re losing them because you&rsquo;re hard to find and easy to doubt. Good news: that part is fixable, and it doesn&rsquo;t take long.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
