import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, inView: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
      onComplete: () => setVal(target),
    })
    return () => controls.stop()
  }, [inView, target])
  return val
}

export function Ownership() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const rent = useCountUp(72000, inView)
  const own = useCountUp(30500, inView)

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } } }
  const tickV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }

  const peso = (n: number) => '₱' + n.toLocaleString('en-PH')

  return (
    <section className="bg-ink px-6 py-[110px] text-cream">
      <div ref={ref} className="mx-auto max-w-[900px] text-center">
        <h2 className="mb-[70px] text-balance font-serif text-[clamp(30px,4.4vw,48px)] font-[460] leading-[1.12] tracking-[-0.02em]">
          Renting a website never ends.
          <br />
          Owning one does.
        </h2>

        <div className="flex flex-col gap-10 text-left">
          {/* renting */}
          <div className="rounded-[20px] border px-7 pt-7 pb-[26px]" style={{ borderColor: 'rgba(177,183,171,.3)' }}>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-sage">Renting: ₱2,000 a month</p>
              <p className="font-serif text-[clamp(30px,4vw,44px)] font-[550] tracking-[-0.02em] text-sage">
                {peso(rent)}
                <span className="font-sans text-[15px] font-medium whitespace-nowrap" style={{ color: 'rgba(177,183,171,.8)' }}>
                  {' '}
                  and counting
                </span>
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="flex items-center gap-1 overflow-hidden"
              aria-hidden="true"
            >
              {Array.from({ length: 36 }).map((_, i) => (
                <motion.span key={i} variants={tickV} className="h-[26px] min-w-[3px] flex-1 rounded-[2px]" style={{ background: 'rgba(177,183,171,.55)' }} />
              ))}
              <span className="flex-none pl-[10px] text-[15px] font-semibold whitespace-nowrap" style={{ color: 'rgba(177,183,171,.8)' }}>
                forever →
              </span>
            </motion.div>
            <p className="mt-4 text-[15px]" style={{ color: 'rgba(251,246,240,.7)' }}>
              Stop paying, and the website disappears. You own nothing.
            </p>
          </div>

          {/* owning */}
          <div className="rounded-[20px] border px-7 pt-7 pb-[26px]" style={{ background: 'rgba(39,97,82,.25)', borderColor: 'rgba(127,175,159,.5)', boxShadow: '0 30px 60px -28px rgba(0,0,0,.5)' }}>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-sage-2">Owning: pay once</p>
              <p className="font-serif text-[clamp(30px,4vw,44px)] font-[550] tracking-[-0.02em] text-cream">
                {peso(own)}
                <span className="font-sans text-[15px] font-medium whitespace-nowrap text-sage-2"> total</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-[26px] w-[22%] min-w-[90px] flex-none rounded-[6px] bg-sage-2" style={{ boxShadow: '0 8px 20px -8px rgba(127,175,159,.6)' }} />
              <span className="h-[2px] flex-1 rounded-[1px]" style={{ background: 'rgba(127,175,159,.25)' }} />
              <span className="inline-flex flex-none items-center gap-[7px] text-[15px] font-semibold whitespace-nowrap text-sage-2">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M5 12.5l5 5 9-11" fill="none" stroke="#7FAF9F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                yours forever
              </span>
            </div>
            <p className="mt-4 text-[15px]" style={{ color: 'rgba(251,246,240,.85)' }}>
              The code and the domain are in your name. No monthly bill after that. It&rsquo;s yours.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-[34ch] font-serif text-[clamp(22px,3vw,30px)] font-[440] italic leading-[1.35] text-cream">
          Same three years, ₱41,500 apart, and only one of them is yours.
        </p>
      </div>
    </section>
  )
}
