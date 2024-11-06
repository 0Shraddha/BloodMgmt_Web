import React from 'react'

const Heading = ({title, desc,  ...props}) => {
  return (
    <>
       

        <div className="row heading" {...props}>
          <h3 style={{ color: '#404F9C' }}>{title}</h3>
          <small className="text-muted">{desc}</small>
        </div>
    </>
  )
}

export default Heading