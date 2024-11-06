import React from 'react'

const Heading = ({title, desc,  ...props}) => {
  return (
    <>
       

        <div className="row heading" {...props}>
          <h2 style={{ color: '#404F9C' }}>{title}</h2>
          <small className="text-muted">{desc}</small>
        </div>
    </>
  )
}

export default Heading