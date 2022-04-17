import React from 'react'
import { Link } from 'react-router-dom'
import FindAStore from './FindAStore'
import './FooterSecondary.css'
import {motion} from 'framer-motion'

function FooterSecondary({ alignItems, paddingLeft, flexDirection }) {
  return (
    <div
      className='footerSecondary'
      style={{ alignItems }}
    >
    </div>
  )
}

export default FooterSecondary
