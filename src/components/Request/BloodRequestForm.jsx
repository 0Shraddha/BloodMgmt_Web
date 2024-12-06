import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import Input from "../Registration/Input";
import "../../Styles/Input.scss";

const BloodRequestForm = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { centerName: cn, centerId: ci, bloodType: bt, availableUnits: au } = location.state || {};
    const userDetail = localStorage.getItem('userToken');
  
    const parsedUser = JSON.parse(userDetail);
    const parsedUserRole = parsedUser.role
    const parsedUsername = parsedUser.username
    const [requestDetail, setRequestDetail] = useState({
        requestedBy: "",
        units: "",
        reason: "",
    });
    const [error, setError] = useState(null);
    const [document, setDocument] = useState(null);
    const [isError, setIsError] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        requestedBy: "",
        reason: "",
        document: "",
        bloodType: "",
        units: "",
    });

    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const handleUnitsChange = (e) => {
        const units = parseInt(e.target.value, 10);
        setRequestDetail((prev) => ({ ...prev, units }));

        if (units > au) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestDetail((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleClearError = (fieldName) => {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: '',
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isError) {
            alert("Entered units exceed available units. Please adjust the quantity.");
            return;
        }

        const formData = new FormData();
        formData.append("requestedBy", parsedUsername);
        formData.append("bloodType", bt);
        formData.append("units", requestDetail.units);
        formData.append("reason", requestDetail.reason);
        formData.append("document", document);
        formData.append("centerId", ci);

        try {
            const response = await fetch("http://localhost:5000/user/blood-request", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                // Set individual field errors from the response
                setFieldErrors(data.errors || {});
                // toast.error("Please Correct the Information and Submit Again.")
                throw new Error(data.msg || "Request Failed");
            }

            const data = await response.json();
            toast.success("Blood Requested Successfully.");

            setTimeout(()=>{
                navigate("/blood-inventory-list");
            }, 3000)
           
        } catch (err) {
            // setError(err.message);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="request-form">
                <h2 className="py-3 form-heading text-center">Request</h2>

                {error ? (
                    <p style={{ color: "red" }}>Error: {error}</p>
                ) : (
                    <form className="py-4 px-5" onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* <Input
                            label="Fullname"
                            type="text"
                            placeholder="Enter your fullname"
                            name="requestedBy"
                            value={requestDetail.requestedBy}
                            onChange={handleChange}
                            error={fieldErrors.requestedBy} 
                            onClearError={() => handleClearError("requestedBy")}
                        /> */}

                        <label htmlFor="centerId">Center</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="centerId"
                            value={cn || "Center not selected"}
                            readOnly
                            required
                        />

                        <label htmlFor="bloodType">Blood Type</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="bloodType"
                            value={bt || "Blood type not provided"}
                            readOnly
                            required
                        />

                        <Input
                            label={`Blood Units (Available: ${au || 0})`}
                            type="number"
                            placeholder="Enter blood units"
                            name="units"
                            value={requestDetail.units}
                            onChange={handleUnitsChange}
                            error={fieldErrors.units} // Show error if exists
                            onClearError={() => handleClearError("units")}

                        />

                        {isError && (
                            <p style={{ color: "red" }}>
                                Entered units exceed available units: {au}
                            </p>
                        )}

                        <Input
                            label="Document"
                            type="file"
                            name="document"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            error={fieldErrors.document} // Show error if exists
                            onClearError={() => handleClearError("document")}

                        />

                        <Input
                            textarea
                            label="Reason"
                            type="text"
                            placeholder="Reason for requesting blood..."
                            name="reason"
                            value={requestDetail.reason}
                            onChange={handleChange}
                            error={fieldErrors.reason} // Show error if exists
                            onClearError={() => handleClearError("reason")}

                        />

                        <div>
                            <button
                                type="submit"
                                className="btn"
                                id="btnSubmit"
                                disabled={isError} // Disable submit if there's an error
                            >
                                Request
                            </button>
                        </div>
                    </form>
                )}
            </div>
      <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
};

export default BloodRequestForm;
