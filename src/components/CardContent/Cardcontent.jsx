import React from 'react'
import Card from './Card'
import Topbar from '../topbar/Topbar'

const Cardcontent = () => {
  return (
    <>
    <Topbar title="Weekly Sumup"
              desc="Get summary of weekly transactions here."/>
        <div className="row d-flex" id="main_contents">
            <div className="col">
              <Card title="Total Donors"
                  detail="+5.2% from last month"
                  number={1540}
                  titleColor="#FB8E3B"
                  bodyColor="#FFF2E8"
              />
            </div>
            <div className="col">
              <Card title="Total Donations"
                  detail="+8.2% from last month"
                  number={2340}
                  titleColor="#3391D0"
                  bodyColor="#EEF6FF"
              />
            </div>
            <div className="col">
              <Card title="Active Donors"
                  detail="+5.2% from last month"
                  number={1540}
                  titleColor="#B60C0C"
                  bodyColor="#FFF0F0"
              />
            </div>
            <div className="col">
              <Card title="Recent Activity"
                  detail="New donors in the last week"
                  number={+340}
                  titleColor="#22A447"
                  bodyColor="#F2FFF6"
              />
            </div>
          </div>
    </>
  )
}

export default Cardcontent