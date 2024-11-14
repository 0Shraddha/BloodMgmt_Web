import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import { fetchCenterData } from "../../Services/BloodInventoryService";
import { Link } from 'react-router-dom'


const BloodInventoryList = () => {
    const [centerBlood, setCenterBlood] = useState([]);
    const [ error, setError ] = useState(null);

    //Fetch blood details with center from backend when the component loads

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


    return (
        <>
        <div className="mt-5">Blood Inventory List</div>
        <Link to="/blood-inventory-form" className='btn' id="btnSubmit">Add Data</Link>

       {centerBlood ?
       (
        <>
        <h2>Blood Inventory: </h2>

            <ul>
            {centerBlood.bloodInventory?.map((inventory, index) => (
                            <li key={inventory._id}>{index+1}
                                {/* <p><strong>Center Id:</strong> {inventory.centerId._id}</p> */}
                                <p><strong>Center Name:</strong> {inventory.centerId.centerName}</p>
                                <p><strong>Blood Type:</strong> {inventory.bloodType}</p>
                                <p><strong>Units Available:</strong> {inventory.units}</p>
                            </li>
                        ))}
            </ul>
            <h2>Total Blood: </h2>

            <ul>
            {centerBlood.totalBlood?.map((blood, index) => (
                    <li key={index+1}>
                        <p><strong>BloodType:</strong> {blood.bloodType}</p>
                        <p><strong>Units:</strong> {blood.units}</p>
                    </li>
                ))}
            </ul>
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