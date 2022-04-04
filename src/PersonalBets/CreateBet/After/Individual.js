import React from 'react'
import './Individual.css'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
function Individual({socialBet}) {
    const data = socialBet.data
    const to = '/MySocialBets/details/' + data.id
    
  
  return (
    <motion.div initial={{y:100, opacity:0}} animate={{y:0, opacity:1}} transition={{type:'spring', duration:0.2, stiffness:125}} className='individual_div'>
        <div>
            <h1>{data.Title}</h1>
            <p>{data.Description}</p>
            <div>
                <p>🙋‍♂️{data.usersInBet.length}</p>
                <p className='two'>💲{data.Price}</p>
                <p className='two'>📆{data.FinalDay}</p>
            </div>
        </div>
        <Link to={to}>
        <motion.button whileHover={{boxShadow:'4px 4px #757575'}} transition={{duration:0.2}}>Details</motion.button>
        </Link>
        </motion.div>
  )
}

export default Individual