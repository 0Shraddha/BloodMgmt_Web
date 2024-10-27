import React, {useState} from 'react'
import './TabButton.scss'
import { TabsContent } from '../../data';
import Topbar from '../topbar/Topbar';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';


const TabButtonWrapper = () => {
    const [selectedTab, setSelectedTab] = useState('A+');

    const handleSelectTabs = (selectedButton) => {
      setSelectedTab (selectedButton);
    }
  return (
    <>
     <div className="row" style={{ marginTop : '10px'}}>
      <Topbar title="Blood Availability In Different Center" desc="Blood Available  in various Centers (1 UNITS equals to 450/500 ml)" />

      <Tabs
      buttonsContainer="menu"   //string for built in components &&&  {section}--{} for custom components
      buttons={<>
        <ul className="nav my-3 list-inline px-0" id="bloodTab" role="tablist">
              <li className={`tab-button ${selectedTab === 'A+' ? 'active' : ''}`} onClick={() => handleSelectTabs('A+')}>A+</li>
              <li className={`tab-button ${selectedTab === 'A-' ? 'active' : ''}`} onClick={() => handleSelectTabs('A-')}>A-</li>
              <li className={`tab-button ${selectedTab === 'B+' ? 'active' : ''}`} onClick={() => handleSelectTabs('B+')}>B+</li>
              <li className={`tab-button ${selectedTab === 'B-' ? 'active' : ''}`} onClick={() => handleSelectTabs('B-')}>B-</li>
            </ul>
      </>}
      >
      {TabsContent[selectedTab]?.map((centerInfo, index) => (
        <div className='row bloodTabContent px-2 py-4 mx-2 mb-4' key={index}>
          <div className="col-6">
            <h4 style={{ color: '#404F9C' }}>{index + 1}. {centerInfo.center}</h4>
            <i>{centerInfo.location}</i><br />
            <a href={`tel:${centerInfo.contact}`} style={{ textDecoration: 'none', color: '#222'}}><i>{centerInfo.contact}</i></a>
          </div>
          <div className="col-5">
            <p>Whole Blood: <span className='type'> {centerInfo.type.whole_blood} </span>Units Available</p>
            <p>Red Blood Cells: <span className='type'> {centerInfo.type.red_blood_cells} </span>Units Available</p>
            <p>Platelets: <span className='type'> {centerInfo.type.platelets} </span>Units Available</p>
            <p>Plasma: <span className='type'> {centerInfo.type.plasma} </span>Units Available</p>
          </div>
          <div className="col">
            <Link to="/req-blood" className='btn btn-sm btn-outline-success'>Request</Link>
          </div>
        </div>
      ))}

        </Tabs>  
           
                
            
          </div>
    </>
  )
}

export default TabButtonWrapper