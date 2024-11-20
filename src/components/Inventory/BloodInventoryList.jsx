import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import { fetchCenterData } from "../../Services/BloodInventoryService";
import { Link } from 'react-router-dom'
import PolarAreaChart from "../Charts/PolarChartArea";
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Input from "../Registration/Input";
import "../../Styles/BloodInventoryList.scss";



const BloodInventoryList = () => {
    const [centerBlood, setCenterBlood] = useState([]);

    //Fetch blood details with center from backend when the component load
    useEffect(()=>{
        const loadBloodDetails = async () => {
            try{
                const fetchedBloodDetails = await fetchCenterData();
                setCenterBlood(fetchedBloodDetails);
                console.log("the get list of blood ineventory: " + JSON.stringify(fetchedBloodDetails))


            }catch(error){
                console.error("Error fetching center data:", err);
                setError("Failed to load center data. Please try again.");
            }
        }
        loadBloodDetails();
    }, [])


    // Extract labels (blood types) and units dynamically
    const labels = centerBlood.totalBlood?.map((blood) => blood.bloodType) || [];
    const series = centerBlood.totalBlood?.map((blood) => blood.units) || [];

    // Define chart options
    const options = {
        chart: {
        type: "polarArea",
        height: 300,
        width: 300,
        },
        labels, // Dynamic labels
        stroke: {
        colors: ["#fff"], // Border colors
        },
        fill: {
        opacity: 0.8, // Transparency for the segments
        },
        legend: {
        show: true, // Enable legend
        position: "bottom", // Position at the bottom
        },
        tooltip: {
        y: {
            formatter: (value) => `${value} units`, // Tooltip format
        },
        },
        responsive: [
        {
            breakpoint: 480,
            options: {
            chart: {
                width: 200,
                height: 200,
            },
            },
        },
        ],
    };
  
    return (
        <>

        <div className="row d-flex text-end">

            <span><Link to="/blood-inventory-form" className='btn my-5 text-end' id="btnSubmit">Add Data</Link></span>

        </div>
       {centerBlood ?
       (
        <>
            <span className="px-3 mt-5 py-2 fw-semibold rounded-pill" style={{  color:' #3577f1',backgroundColor: 'rgba(53, 119, 241, .1)'}}>Blood Inventory</span>

                {/* 
                    <ul>
                    {centerBlood.totalBlood?.map((blood, index) => (
                            <li key={index+1}>
                                <p><strong>BloodType:</strong> {blood.bloodType}</p>
                                <p><strong>Units:</strong> {blood.units}</p>
                            </li>
                        ))}
                    </ul>
                */}

            <PolarAreaChart series={series} options={options} />

            <span className="px-3 py-2 fw-semibold rounded-pill" style={{  color:' #3577f1',backgroundColor: 'rgba(53, 119, 241, .1)'}}>Blood Inventory</span>
            <Input
                select
                name="bloodType"
                options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                ]}
            />

            
<div className="container mt-4">
      <div className="row">
        {centerBlood.bloodInventory?.map((inventory, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={inventory._id}>
            <div
              className="card mb-2"
            >
              <div className="card-body mb-2">
                <h6 className="card-title">
                  <span className="rounded-pill me-2">{index + 1}.</span>
                  {inventory.centerId.centerName}
                </h6>
                <hr />
                <p className="card-text">
                  <small>Blood Type:</small> {inventory.bloodType}
                </p>
                <p className="card-text">
                  <small>Units Available:</small> {inventory.units}
                </p>
                <div className="text-end">
                    <span style={{ cursor: 'pointer', marginRight: '10px' }} >
                        <FaRegEdit size={'16px'} color='#fcba28'/>
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        <MdDeleteOutline size={'17px'} color='#e1002d'/>
                    </span>
                </div>
              </div>
              {/* <div className="card-footer text-muted text-center">
                <small>Center ID: {inventory.centerId._id}</small>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
        </>

       )
       :
       (
        <h2>No data</h2>
        )

        }

        


        </>
    );
}

export default BloodInventoryList;