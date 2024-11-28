import React, { useState, useEffect } from "react";
import Input from "../Registration/Input";
import "../../Styles/Input.scss";

const BloodRequestForm = () => {
    const [requestDetail, setRequestDetail] = useState({
        requestedBy: "",
        units: "",
        bloodType: "",
        reason: "",
    });

    const [error, setError] = useState(null);
    const [document, setDocument] = useState(null); // Separate state for file

    const [inventoryCenters, setInventoryCenters] = useState([]);
    const [availableBloodTypes, setAvailableBloodTypes] = useState([]);
    const [availableUnits, setAvailableUnits] = useState(0);
    const [selectedCenter, setSelectedCenter] = useState("");
    const [isError, setIsError] = useState(false);

    // Fetch inventory centers and blood data
    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch("http://localhost:5000/user/blood-request", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setInventoryCenters(data.bloodInventory || []);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCenters();
    }, []);

    // Handle center selection
    const handleCenterChange = (e) => {
        const centerId = e.target.value;
        setSelectedCenter(centerId);

        // Filter available blood types based on selected center
        const filteredBloodTypes = inventoryCenters
            .filter((item) => item.centerId._id === centerId)
            .map((item) => item.bloodType);

        setAvailableBloodTypes([...new Set(filteredBloodTypes)]); // Remove duplicates
    };

    // Handle blood type selection
    const handleBloodTypeChange = (e) => {
        const bloodType = e.target.value;
        setRequestDetail((prev) => ({ ...prev, bloodType }));

        // Get the total units for the selected center and blood type
        const totalUnits = inventoryCenters
            .filter(
                (item) =>
                    item.centerId._id === selectedCenter && item.bloodType === bloodType
            )
            .reduce((acc, item) => acc + item.units, 0);

        setAvailableUnits(totalUnits);
    };

    // Handle units change
    const handleUnitsChange = (e) => {
        const units = e.target.value;
        setRequestDetail((prev) => ({ ...prev, units }));

        // Check if the entered units exceed the available units
        if (units > availableUnits) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestDetail((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isError) {
            // Prevent form submission if there's an error
            return;
        }

        const formData = new FormData();
        formData.append("requestedBy", requestDetail.requestedBy);
        formData.append("bloodType", requestDetail.bloodType);
        formData.append("units", requestDetail.units);
        formData.append("reason", requestDetail.reason);
        formData.append("document", document);

        try {
            const response = await fetch("http://localhost:5000/user/blood-request", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Request Failed. Please try again.");
            }

            const data = await response.json();
            console.log("Response:", data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Debugging: View data being rendered
    console.log("Inventory Centers:", inventoryCenters);
    console.log("Available Blood Types:", availableBloodTypes);
    console.log("Available Units:", availableUnits);
    console.log("Is Error:", isError);

    return (
        <div className="login-container align-items-center">
            <h2 className="py-3 form-heading text-center">Request</h2>

            {error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <form className="py-4 px-5" onSubmit={handleSubmit} encType="multipart/form-data">
                    <Input
                        label="Fullname"
                        type="text"
                        placeholder="Enter your fullname"
                        name="requestedBy"
                        value={requestDetail.requestedBy}
                        onChange={handleChange}
                    />

                    <label htmlFor="centerId">Center</label>
                    <select
                        className="form-select"
                        name="centerId"
                        onChange={handleCenterChange}
                        required
                    >
                        <option value="">
                            Select Center
                        </option>
                        {inventoryCenters && inventoryCenters.length > 0 ? (
                            [...new Set(inventoryCenters.map((center) => center.centerId._id))].map(
                                (centerId) => {
                                    const center = inventoryCenters.find(
                                        (item) => item.centerId._id === centerId
                                    );
                                    return (
                                        <option key={centerId} value={centerId}>
                                            {center.centerId.centerName}
                                        </option>
                                    );
                                }
                            )
                        ) : (
                            <option disabled>Loading centers...</option>
                        )}
                    </select>

                    <label htmlFor="bloodType">Blood Type</label>
                    <select
                        className="form-control"
                        id="bloodType"
                        name="bloodType"
                        value={requestDetail.bloodType}
                        onChange={handleBloodTypeChange}
                        required
                    >
                        <option value="">Select blood type</option>
                        {availableBloodTypes.length > 0 ? (
                            availableBloodTypes.map((bloodType) => (
                                <option key={bloodType} value={bloodType}>
                                    {bloodType}
                                </option>
                            ))
                        ) : (
                            <option disabled>No available blood types</option>
                        )}
                    </select>

                    <Input
                        label="Blood Units"
                        type="number"
                        placeholder="Enter blood units"
                        name="units"
                        value={requestDetail.units}
                        onChange={handleUnitsChange}
                    />

                    {isError && (
                        <p style={{ color: "red" }}>
                            Entered units exceed available units: {availableUnits}
                        </p>
                    )}

                    <Input
                        label="Document"
                        type="file"
                        name="document"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />

                    <Input
                        textarea
                        label="Reason"
                        type="text"
                        placeholder="Reason for requesting blood..."
                        name="reason"
                        value={requestDetail.reason}
                        onChange={handleChange}
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
    );
};

export default BloodRequestForm;
