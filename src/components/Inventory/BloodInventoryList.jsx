import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import { fetchCenterData } from "../../Services/BloodInventoryService";
import { Link } from 'react-router-dom'
import BarChart from "../Charts/BarChart";
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


    const labels = centerBlood.totalBlood?.map((blood) => blood.bloodType) || [];
    const series = [
      {
        name: "Units Available",
        data: centerBlood.totalBlood?.map((blood) => blood.units) || [],
      },
    ];

    const options = {
      chart: {
        type: "bar", // Bar chart type
        height: 300,
        width: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false, // Set to true for horizontal bars
          columnWidth: "50%", // Adjust bar width
          borderRadius: 5, // Rounded corners
        },
      },
      dataLabels: {
        enabled: true, // Show data labels on bars
        formatter: (val) => `${val}`, // Format the labels
      },
      xaxis: {
        categories: labels, // Dynamic labels for x-axis
        title: {
          text: "Blood Types",
        },
      },
      yaxis: {
        title: {
          text: "Units",
        },
      },
      tooltip: {
        y: {
          formatter: (value) => `${value} units`, // Tooltip format
        },
      },
      fill: {
        opacity: 1, // Make bars fully opaque
      },
      legend: {
        show: true, // Show legend if multiple series
        position: "top",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 280,
            },
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
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
            {/* <span className="p-2  fw-semibold" style={{  color:' #3577f1',backgroundColor: 'rgba(53, 119, 241, .1)'}}>Blood Inventory</span> */}

            <BarChart series={series} options={options} />

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
          <div className="col-md-4 col-sm-6 mb-3 " key={inventory._id}>
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
                  <small>Blood Type:</small> <span style={{ color: '#224e9f' }}>{inventory.bloodType}</span>
                </p>
                <p className="card-text">
                  <small>Units Available:</small> {inventory.units}
                </p>
                <div className="text-end">
                    <span style={{ cursor: 'pointer', marginRight: '10px' }} title="Edit" >
                        <FaRegEdit size={'16px'} color='#fcba28'/>
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        <MdDeleteOutline size={'17px'} color='#e1002d' title="Delete"/>
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