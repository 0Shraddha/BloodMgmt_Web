import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import { deleteBloodData, fetchCenterData } from "../../Services/BloodInventoryService";
import { useAuth } from "../AuthContext/AuthContext";


const BloodInventorCards = ()=>{

  const { role } = useAuth();

    const [selectedBloodType, setSelectedBloodType] = useState("");
  const [centerBlood, setCenterBlood] = useState([]);
  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];


  useEffect(() => {
    const loadBloodDetails = async () => {
      try {
        const fetchedBloodDetails = await fetchCenterData();
        setCenterBlood(fetchedBloodDetails);
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    loadBloodDetails();
    
  }, []);

  const labels = centerBlood.totalBlood?.map((blood) => blood.bloodType) || [];

    const handleTabClick = (bloodType) => {
        setSelectedBloodType(bloodType);
      };

      const filteredInventory = centerBlood.bloodInventory?.filter((inventory) =>
        selectedBloodType ? inventory.bloodType === selectedBloodType : true
      );
    return(
        <>
            <Heading title="Filter Blood Inventory by Type" />    
          <div className="tabs-container d-flex flex-wrap my-3">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`tab-button ${
                  selectedBloodType === type || (type === "All" && selectedBloodType === "")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleTabClick(type === "All" ? "" : type)}
              >
                {type}
              </button>
            ))}
          </div>

            <div className="container mt-4">
              <div className="row">
                {filteredInventory?.map((inventory, index) => (
                  <div className="col-md-4 col-sm-6 mb-3" key={inventory._id}>
                    <div className="card mb-2">
                      <div className="card-body mb-2">
                        <h6 className="card-title">
                          <span className="rounded-pill me-2">{index + 1}.</span>
                          {inventory.centerId.centerName}
                        </h6>
                        <hr />
                        <p className="card-text">
                          <small>Blood Type:</small>{" "}
                          <span style={{ color: "#224e9f" }}>{inventory.bloodType}</span>
                        </p>
                        <p className="card-text">
                          <small>Units Available:</small> {inventory.units}
                        </p>
                        
                        { role === 'admin' ? null : (
                          <div className="text-end">
                            <Link to="/request-blood" state={{ centerName: inventory.centerId.centerName, centerId: inventory.centerId._id, bloodType: inventory.bloodType, availableUnits: inventory.units }} className="btn btn-sm btn-outline-success" style={{ cursor: "pointer", marginRight: "10px" }} title="Request">
                            Request
                            </Link>

                         
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}

export default BloodInventorCards