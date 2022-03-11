import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuHeader.css'

function MenuHeader() {
  const [index, setIndex] = useState(0)

  return (
    <div className='menuHeader'>
      <div className='menuHeader__links'>
        <Link
          className='menuHeader__link'
        >
          Principal page
        </Link>
        <Link
          to='/HowInvest'
          className='menuHeader__link'
        >
          More information
        </Link>
      </div>
    </div>
  )
}

export default MenuHeader
