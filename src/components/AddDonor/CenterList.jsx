import React from 'react'
// import TabButtonWrapper from '../TabButton/TabButtonWrapper'
import { Link } from 'react-router-dom'
import GetCenterList from './GetCenterList'
import Heading from '../Heading/Heading'



const CenterList = () => {
  return (
    <>
    <div className="row d-flex align-items-start" style={{ marginTop:'80px', marginBottom:'20px'}}>
        <div className="col-6">
          <Heading title="Different Centers" desc="Various centers that manage the blood inventory" />
        </div>

          <div className="col-6 text-end">
            <Link to="/add-center" className='btn' id="btnSubmit">Add Center</Link>
          </div>
    </div>
    <GetCenterList />
   
        {/* <TabButtonWrapper /> */}

    </>

  )
}

export default CenterList