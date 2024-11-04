import React from 'react'
import  {useState, useEffect}  from  'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { BiSolidEdit } from "react-icons/bi";
import '../../Styles/CenterList.scss'



const GetCenterList = () => {

    const [centers, setCenters] = useState([]);
    const [error, setError] = useState(null);
  
    // Fetch donors from the backend when the component loads
    useEffect(() => {
      fetch('http://localhost:5000/center', {
        method: 'GET',
        credentials: "include",
        headers: {
          "Content-Type" : "application/json"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setCenters(data))
        .catch(error => setError(error.message));
    }, []);

  return (
   <>
   
   {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : centers.length > 0 ? (
        <ul>
          {centers.map((center, index) => (
            <li key={index}>
              <h3>{center.centerName}</h3>
              <p>Location: {center.location}</p>
              <p>Contact: {center.phone}</p>
              <p>Email: {center.email}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No centers found.</p>
      )}
      

      <div className="row">
        {centers.map((center, index) => {
          <div className="col-12 border-bottom py-3 px-2" key={index}>
          {/* <p><span className="badge badge-outline-info"></span></p> */}
          <div className="row px-3 d-flex">
          
          <div className="col-5">
            <h4 className="mx-2" style={{ color:'#444'}}>{index}. {center.centerName}</h4>
            <div class="py-2"><FaLocationDot color="#<strong>22</strong>2" size={18} /><span class="px-2 text-secondary">{center.location}</span></div>
            <div><MdOutlinePhone color="#<strong>22</strong>2" size={18} /><span class="px-2 text-secondary">{center.phone}</span></div>
            <div className="py-2"><MdOutlineEmail color="#<strong>22</strong>2" size={18} /><span class="px-2 text-secondary">{center.email}</span></div>

          </div>

          <div className="col-5 bg-light py-3">
            <h6 className='text-white bg-danger'>Blood Inventory</h6>
            <div className="row py-2 d-flex">
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">A+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">A-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">B+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">B-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button">AB+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button">AB-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">O+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">O-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
            </div>
           
          </div>

          <div className="col text-end">
            <p><BiSolidEdit color="#<strong>22</strong>2" size={24}/></p>
          </div>
          </div>
          
        </div>
        })}
        

        <div className="col-12 py-3 px-2" style={{backgroundColor:'#FFF6ED'}}>
          {/* <p><span className="badge badge-outline-info"></span></p> */}
          <div className="row px-3 d-flex" >
          
          <div className="col-5">
            <h4 style={{ color: '#404F9C', fontWeight:'500', fontFamily:'poppins' }}>1. Blood Donation Camp</h4>
            <div className="py-2 mx-3" style={{ color : '#444'}}><FaLocationDot color="#444" size={18} /><span className="px-2">location address</span></div>
            <div className="mx-3" style={{ color : '#444'}}><MdOutlinePhone color="#444" size={18} /><span className="px-2">+977-34378565</span></div>
            <div className="py-2 mx-3" style={{ color : '#444'}}><MdOutlineEmail color="#444" size={18} /><span className="px-2">info@bloodcamp.np</span></div>

          </div>

          <div className="col-5 p-4">
          <span className='h6 px-3 py-2' style={{ backgroundColor: '#404F9C', color : '#fff', borderRadius:'8px' }}>Blood Inventory</span>
            <div className="row py-4 d-flex">
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">A+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">A-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">B+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">B-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button">AB+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button">AB-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">O+</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>12</strong> units available</span>
              </div>
              <div className="col-6 mb-4">
                <span className="h6 blood-button px-4">O-</span>
                <span className="mx-2" style={{ color:'#444'}}><strong>22</strong> units available</span>
              </div>
            </div>
           
          </div>

          <div className="col text-end">
            <p><BiSolidEdit color="#<strong>22</strong>2" size={24}/></p>
          </div>
          </div>
          
        </div>

    </div>
      </>
  )
}

export default GetCenterList