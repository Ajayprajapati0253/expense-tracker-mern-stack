import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
        <Link to="/">
            <img src='./src/assets/expenselogo.jpg' alt='' 
                className='w-14'
            />
        </Link>
    </div>
  )
}

export default Logo