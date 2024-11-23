import React, { useState, useEffect } from 'react';
import { addOrUpdateBloodData, fetchCenterData } from '../../Services/BloodInventoryService';
import { toast, ToastContainer } from 'react-toastify';
import Heading from '../Heading/Heading';
import Input from '../Registration/Input';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const BloodInventoryForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const centerData = location.state?.centerData || null;

  const [centerValues, setCenterValues] = useState({
     centerId: centerData?.centerId || '',
    bloodType: centerData?.bloodType || '',
    units: centerData?.units || '',
    // lastUpdated: centerData ? centerData.lastUpdated : '',
  });

  const [centerList, setCenterList] = useState([]);
  const [error, setError] = useState(null);

 // State to hold blood inventory data, only shown after successful submission
 const [bloodInventory, setBloodInventory] = useState(null);
 const [totalBlood, setTotalBlood] = useState(null);

 useEffect(() => {
  const loadCenterData = async () => {
    try {
      const fetchedData = await fetchCenterData();
      setCenterList(fetchedData.center || []); // Set center data only
      // console.log("Fetched center data:", fetchedData);
    } catch (err) {
      console.error("Error fetching center data:", err);
      setError("Failed to load center data. Please try again.");
    }
  };

  loadCenterData();
}, []);



  const handleValues = (e) => {
    const { name, value } = e.target;
    setCenterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addOrUpdateBloodData(centerValues);
      console.log('response:', data);
      toast.success(centerData ? "Data updated successfully!" : "Data added successfully!");

      // Set Formand totalBlood only on successful submission
      setBloodInventory(data.bloodInventory);
      setTotalBlood(data.totalBlood);
      console.log('Submission response:', data);

      navigate('/blood-inventory-list',{
        state : {
          centerList : centerList,
          bloodInventory : data.bloodInventory,
          totalBlood : data.totalBlood
        }
      } )
    } catch (err) {
      setError(err.message || 'Failed to add blood details. Please try again');
      toast.error(`Error: ${err.message}`);
    }
  };

  const isFormValid = centerValues.centerId && centerValues.bloodType && centerValues.units;


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="add-container px-5 py-4 mb-5">
        <Heading title="Blood Inventory" className="py-3" />

        <form onSubmit={handleSubmit} className="addBloodDataForm">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="row">
            <div className="px-0">
              <label htmlFor="centerId">Center</label>
              <select
                  className="form-select"
                  name="centerId"
                  value={centerValues.centerId}
                  onChange={handleValues}
                  required
              >
                  <option value="" disabled>
                      Select Center
                  </option>
                  {centerList.map((center) => (
                      <option key={center._id} value={center._id}>
                          {center.centerName}
                      </option>
                  ))}
              </select>

            </div>
           
          

            {/* <Input
              label="Last Updated"
              type="date"
              name="lastUpdated"
              value={centerValues.lastUpdated}
              onChange={handleValues}
              required
            />*/}
          </div> 

          <div className="row py-4">
          <label htmlFor="bloodType">Blood Group: (Select blood group) </label>
            <select
              className='form-select'
              name="bloodType"
              id="bloodType"
              value={centerValues.bloodType}
              onChange={handleValues}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="row">
          <Input
          className="form-control"
                  label="Units: "
                  name="units"
                  id="units"
                  placeholder="Enter the units"
                  type="number"
                  value={centerValues.units}
                  onChange={handleValues}
                  style={{ marginBottom: '10px' }}
                  required
                />
          </div>

          <div>
          <button
              className="btn my-3"
              style={{ width: '100%' }}
              id="btnAdd"
              disabled={!isFormValid}
          >
              {centerData ? 'Update Data' : '+ Add Data'}
          </button>
          </div>
        </form>


      </div>
    </>
  );
};

export default BloodInventoryForm;
