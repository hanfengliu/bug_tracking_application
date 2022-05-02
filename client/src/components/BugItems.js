import React from 'react'
import BugItem from './BugItem'

const BugItems = ({bugsList}) => {
  
  return (
    <section className='mt-3'>
        {bugsList.map(bug=>(
            <BugItem key={bug.id} bug={bug}/>
        ))}
    </section>
  )
}

export default BugItems