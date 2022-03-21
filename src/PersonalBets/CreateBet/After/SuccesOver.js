import React, {useEffect, useState} from 'react'
import './SuccesOver.css'
import {Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import db from '../../../firebase'
function SuccesOver({uidPersonal}) {
  db.collection('socialBets').doc(uidPersonal).update(
    {
      payment: true
    }
  )
  useEffect(
    ()=>{

    }, []
  )
  return (
    <div className='Total'>
        <motion.div initial={{y:-1000, opacity:0}} animate={{y:0, opacity:1}} transition={{type:'spring', stiffness:75}} className="succeso_container">
            <h3 className="succeso_h3">😁 Thank you for the bet!</h3>
            <Link to='/MySocialBets'><button >Track your bet here!</button></Link>
        </motion.div>
    </div>
  )
}

export default SuccesOver