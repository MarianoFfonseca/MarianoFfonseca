import * as React from 'react'
import { useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import { useDimensions } from './use-dimensions'
import { MenuToggle } from './MenuToggle'
import { Navigation } from './Navigation'
import "./Example.css"
import './Responsive.css'
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),

  closed: {
    clipPath: 'circle(0px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)

  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  console.log(height)
  const Display = isOpen === false ? 'none' : '';
  
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={isOpen ? height : '50px'}
      ref={containerRef}
      className={isOpen ? 'nav' : 'noNav'}
    >
      
      <motion.div className='background'  variants={sidebar} />
      <div className={Display}>
      <Navigation toggle={() => toggleOpen()} />
      </div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}
