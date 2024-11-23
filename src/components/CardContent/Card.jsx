import React from 'react'


const Card = ({title, detail, number, titleColor, bodyColor}) => {
  return (
    <>
        <div className="card-dashboard pt-4 text-center" style={{ backgroundColor: bodyColor }}>
            <span style={{ color: titleColor }}>{number}</span>
            <div className="card-body style={{ titleColor }}">
                <p className="card-content text-muted">{detail}</p>
                <h5 className="card-title">{title}</h5>
            </div>
        </div>
    </>
  )
}

export default Card