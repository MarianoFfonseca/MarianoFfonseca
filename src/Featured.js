import React from 'react'
import './Featured.css'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

function Featured({
  title,
  info,
  link,
  path,
  image,
  order,
  background,
  color,
  className,
  animation
}) {
  return (
    <div className='featured' style={{ background }}>
      <motion.div 
      animate={{x:30}}
      initial={{ x:-30}}
      transition={{yoyo: Infinity, duration: 2}}
      className='featured__left' style={{ order, color }}>
        <h1>{title}</h1>
        <h4>{info}</h4>
        <Link to={path} className={className}>
          {link}
        </Link>
      </motion.div>
      <div className='featured__right'>
        <motion.img 
         animate={{ x:30 }}
         initial={{ x:-30}}
         transition={{yoyo: Infinity, duration: 2}}
        src={image} alt='' />
      </div>
    </div>
  )
}

export default Featured
