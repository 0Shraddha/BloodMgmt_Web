import React, { useState } from 'react'
import Input from '../Registration/Input';
import Heading from '../Heading/Heading';
import Map from '../MapWithSearch/Map';
import '../../Styles/Input.scss'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddDonor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const centerData = location.state?.centerData;


    const [centerValues, setCenterValues] = useState({
        centerName: centerData?.centerName || '',
        email: centerData?.email || '',
        phone: centerData?.phone || '',
        location: centerData?.location || '',
        latitude: centerData?.latitude || '',
        longitude: centerData?.longitude || '',
    });
    const [error, setError] = useState(null);

    const handleValues = (e) => {
        const { name, value } = e.target;
        setCenterValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

    }

    const handleLocationChange = (address, latitude, longitude) => {
        setCenterValues((prevValues) => ({
          ...prevValues,
          location: address,
          latitude: latitude,
          longitude: longitude,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const method = centerData ? 'PUT' : 'POST';
            const url = centerData
                ? `http://localhost:5000/center/${centerData._id}`
                : 'http://localhost:5000/center';

            const response = await fetch(url, {
                method,
                credentials: 'include',
                body: JSON.stringify({
                    centerName: centerValues.centerName,
                    email: centerValues.email,
                    phone: centerValues.phone,
                    location: centerValues.location,
                    latitude: centerValues.latitude,
                    longitude: centerValues.longitude,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 400 ) {
                const errorData = await response.json();
    
                if (errorData.error) {
                    Object.entries(errorData.error).forEach(([field, message]) => {
                        if (message) {
                            toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`);
                        }
                    });
                }
                return;
            } else if( response.status === 500){
                const errorData = await response.json();
    
                if (errorData.errors) {
                    Object.entries(errorData.errors).forEach(([field, message]) => {
                        if (message) {
                            toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`);
                        }
                    });
                }
                return;

            }else if (!response.ok) {
                // Handle other non-204 errors
                throw new Error('Failed to add new center. Please try again.');
            }

            const data = await response.json();
            console.log('response:', data);
            toast.success(centerData ? "Data updated successfully!" : "Data added successfully!");

            setTimeout(() => {
                navigate('/center');
            }, 2000);

        } catch (err) {
            setError(err.message);
            toast.error(`Error: ${err.message}`)

        }

    };

    return (
        <>

            <ToastContainer position="top-right" autoClose={3000} />
            <div className="add-container row px-5 py-4 mb-5"
            style={{
                width: '65%',
                marginLeft: '10%',
            }}>
                <Heading title="Center Form" className="py-3"/>

                <form onSubmit={handleSubmit} className='addDonorForm'>

                    {error && <p style={{ color: 'red' }}>{error}</p>}


                    <div className='row'>
                        <div className="px-0">
                            <Input
                                label="Center Name: "
                                type="text"
                                id="centername"
                                name="centerName"
                                placeholder="Enter the center name... "
                                value={centerValues.centerName}
                                onChange={handleValues}
                                style={{ marginBottom: '10px' }}
                                required
                            />
                        </div>
                        <div className="col-12 d-flex py-1 px-1 gap-2" style={{ marginBottom: '10px' }}>
                            <div className="col-6">
                            <Input label="Email: " name="email" id="email" placeholder="Enter your email address " type="text"
                                value={centerValues.email}
                                onChange={handleValues}
                                style={{ marginBottom: '10px' }}
                                required

                            />
                            </div>
                            <div className="col-6">
                                <Input label="Phone no.: " name="phone" id="phone" placeholder="Enter your phone number " type="number"
                                    value={centerValues.phone}
                                    onChange={handleValues}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                          
                            <Map onLocationChange={handleLocationChange}
                              initialLatitude={centerValues.latitude}
                              initialLongitude={centerValues.longitude}
                              initialAddress={centerValues.location}
                            />
                    
                            </div>
                        {/* <Input
                                select
                                label="Blood Group: (Select blood group) "
                                name="bloodType"
                                options={[
                                    { value: 'A+', label: 'A+' },
                                    { value: 'A-', label: 'A-' },
                                    { value: 'B+', label: 'B+' },
                                    { value: 'B-', label: 'B-' },
                                    { value: 'AB+', label: 'AB+' },
                                    { value: 'AB-', label: 'AB-' },
                                    { value: 'O+', label: 'O+' },
                                    { value: 'O-', label: 'O-' },
                                ]}
                            /> */
                        }
                    </div>
                    <div>
                    <button className='btn my-3' style={{width:'100%'}} id="btnAdd">{centerData ? 'Update Center' : '+  Add Center'}
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddDonor