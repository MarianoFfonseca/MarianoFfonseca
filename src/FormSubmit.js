import React from 'react'
import './FormSubmit.css'
import {motion} from 'framer-motion'
function FormSubmit({ name, type, onClick }) {
  return (
    <motion.button whileHover={{scaleX:1.05}}  className='formSubmit' type={type}>
      {name}
    </motion.button>
  )
}

export default FormSubmit
