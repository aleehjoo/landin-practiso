import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { config } from '../lib/config'
import { EASE } from '../lib/anim'

export function Nav() {
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={reduce ? false : { y: -80 }}
      animate={reduce ? undefined : { y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="sticky top-0 z-50 border-b backdrop-blur-md transition-shadow duration-300"
      style={{
        background: 'rgba(251,246,240,.86)',
        borderColor: 'rgba(177,183,171,.45)',
        boxShadow: scrolled ? '0 10px 30px -22px rgba(13,58,53,.7)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-[14px]">
        <a
          href="#top"
          className="font-serif text-[22px] font-medium italic tracking-[-0.01em] text-ink no-underline"
        >
          {config.brand}
        </a>
        <a href={config.contactUrl} target="_blank" rel="noreferrer" className="btn">
          Let&rsquo;s talk
        </a>
      </div>
    </motion.nav>
  )
}
