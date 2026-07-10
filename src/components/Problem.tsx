import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function Problem() {
  const chatRef = useRef<HTMLDivElement>(null)
  const inView = useInView(chatRef, { once: true, amount: 0.15 })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timers = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1250),
      setTimeout(() => setStep(4), 2100), // typing
      setTimeout(() => setStep(5), 3400), // doubt replaces typing
      setTimeout(() => setStep(6), 3680), // seen
    ]
    return () => timers.forEach(clearTimeout)
  }, [inView])

  const pop = {
    initial: { opacity: 0, scale: 0.86, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring' as const, stiffness: 520, damping: 30 },
  }

  return (
    <section className="grain relative overflow-hidden bg-cream px-6 pt-[130px] pb-[90px]">
      <div className="relative mx-auto max-w-[720px]">
        <p className="eyebrow mb-[18px] text-green">How you lose a customer in 40 seconds</p>
        <h2 className="mb-14 text-balance font-serif text-[clamp(32px,4.8vw,52px)] font-[460] leading-[1.08] tracking-[-0.02em] text-ink">
          They heard you&rsquo;re great. Then they looked you up.
        </h2>

        <div ref={chatRef} className="mx-auto flex max-w-[480px] flex-col gap-[14px]" aria-label="A text conversation between two friends">
          {step >= 1 && (
            <motion.div
              {...pop}
              className="max-w-[82%] self-start rounded-[18px_18px_18px_6px] border bg-white px-[17px] py-3 text-[15.5px] leading-[1.45] text-ink"
              style={{ borderColor: 'rgba(177,183,171,.5)', boxShadow: '0 8px 20px -12px rgba(13,58,53,.25)' }}
            >
              you HAVE to see the garden venue in Tayabas 😍 perfect for your wedding, promise
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div
              {...pop}
              className="max-w-[82%] self-end rounded-[18px_18px_6px_18px] bg-green px-[17px] py-3 text-[15.5px] leading-[1.45] text-cream"
            >
              omg checking!!
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div {...pop} className="flex w-[88%] flex-col gap-2 self-start">
              <span className="pl-1 text-[11.5px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(13,58,53,.45)' }}>
                What they found
              </span>
              <div className="flex items-center gap-[14px] rounded-[14px] border bg-[#ECEAE4] p-[14px]" style={{ borderColor: 'rgba(177,183,171,.6)' }}>
                <div className="flex h-16 w-16 flex-none items-center justify-center rounded-[10px]" style={{ background: 'linear-gradient(135deg,#D7D4CC,#C9C6BE)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 17l4.5-5.5 3 3.5 2.5-3 5 5" fill="none" stroke="#8E948A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="8" r="1.8" fill="#8E948A" />
                  </svg>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-[15px] font-semibold text-[#6E746B]">Hardin Verde · Garden Events</p>
                  <p className="text-[13.5px] font-semibold text-[#8E948A]">Possibly closed</p>
                  <p className="text-[13px] text-[#A5A399]">3 photos · from 2019 · no prices</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <div className="flex items-center gap-[5px] self-end rounded-[18px_18px_6px_18px] bg-green px-[18px] py-[15px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ background: 'rgba(251,246,240,.85)' }}
                  animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.16 }}
                />
              ))}
            </div>
          )}

          {step >= 5 && (
            <motion.div
              {...pop}
              className="max-w-[82%] self-end rounded-[18px_18px_6px_18px] bg-green px-[17px] py-3 text-[15.5px] leading-[1.45] text-cream"
            >
              looks closed?? let&rsquo;s just book the one in Lucena 😕
            </motion.div>
          )}

          {step >= 6 && (
            <motion.p {...pop} className="self-end text-[12.5px]" style={{ color: 'rgba(13,58,53,.45)' }}>
              Seen · 6:42 PM
            </motion.p>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-[22ch] text-center font-serif text-[clamp(24px,3.4vw,36px)] font-[440] italic leading-[1.3] text-ink"
        >
          You never even knew they were looking.
        </motion.p>
      </div>
    </section>
  )
}
