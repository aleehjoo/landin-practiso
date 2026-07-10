import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// A calm, natural ease used across the site.
export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * A restrained reveal used for a *few* text blocks only — most sections have
 * their own bespoke motion (or none). Under reduced motion it renders in place.
 */
export function Reveal({
  children,
  className,
  y = 20,
  x = 0,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  y?: number
  x?: number
  delay?: number
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
