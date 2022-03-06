import React from 'react'
import { Link } from 'react-router-dom'
import FindAStore from './FindAStore'
import './FooterSecondary.css'
import {motion} from 'framer-motion'

function FooterSecondary({ alignItems, paddingLeft, flexDirection }) {
  return (
    <div
      className='footerSecondary'
      style={{ alignItems, paddingLeft: `${paddingLeft * 2}px` }}
    >
      <div
        className='footerSecondary__container'
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <div className='footerSecondary__info'>
          
          <div className='footerSecondary__right' style={{ flexDirection }}>
            <motion.div whileHover={{scale:1.2, originX:0}}><Link>Responsibility</Link></motion.div>
            <motion.div whileHover={{scale:1.2, originX:0}}><Link>Web Accessibility</Link></motion.div>
            <motion.div whileHover={{scale:1.2, originX:0}}><Link>Privacy Policy</Link></motion.div>
            <motion.div whileHover={{scale:1.2, originX:0}}> <Link>Terms of Use </Link></motion.div>
            <motion.div whileHover={{scale:1.2, originX:0}}><Link>Cookie Preferences</Link></motion.div>
          </div>
        </div>
        <span className='footerSecondary__copyright'>© 2021 modernLotery</span>
      </div>
    </div>
  )
}

export default FooterSecondary
