import React from 'react'
import TabButtonWrapper from '../TabButton/TabButtonWrapper'
import { Link } from 'react-router-dom'

const CenterList = () => {
  return (
    <>
    <div className="row" style={{ marginTop:70, marginRight:50, marginBottom:0}}>
        <div className="col-12 text-end">
            <Link to="/add-center" className='btn' id="btnSubmit">Add Center</Link>
        </div>
    </div>
        <TabButtonWrapper />
    </>

  )
}

export default CenterList