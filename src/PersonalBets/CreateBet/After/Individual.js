import React from 'react'
import './Individual.css'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
function Individual({socialBet}) {
    const data = socialBet.data
    const to = '/MySocialBets/details/' + data.id
    
  
  return (
    <div className='individual_div'>
        <div>
            <h1>{data.Title}</h1>
            <p>{data.Description}</p>
            <div>
                <p>👤{data.usersInBet.length}</p>
                <p className='two'>💲{data.Price}</p>
                <p className='two'>🗓{data.FinalDay}</p>
            </div>
        </div>
        <Link to={to}>
        <motion.button whileHover={{scale:1.2, originX:0}}>Details</motion.button>
        </Link>
        </div>
  )
}

export default Individual