import React, {useState} from 'react'
import Input from '../Registration/Input'
import '../../Styles/Input.scss';

const Request = () => {

    const [requestDetail, setRequestDetail] = useState({
        requestedBy : '',
        units : '',
        bloodType: '',
        reason : ''
    })
    
    const [error, setError] = useState(null);
    const [document, setDocument] = useState(null); // Separate state for file

    const handleFileChange = (e) => {
      setDocument(e.target.files[0]); // Set the actual file in state
  };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setRequestDetail((prevValues) => ({
            ...prevValues,
            [ name ] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('requestedBy', requestDetail.requestedBy);
        formData.append('bloodType', requestDetail.bloodType);
        formData.append('units', requestDetail.units);
        formData.append('reason', requestDetail.reason);
        formData.append('document', document);
        try{
            const response = await fetch('http://localhost:5000/user/blood-request',{
                method : 'POST',
                credentials : 'include',
                body: formData,
                // headers : {
                //     'Content-Type' : 'application/json',
                // },
            });
            if (!response.ok) {
                throw new Error('Request Failed. Please try again.');
            }

            const data = await response.json();
            console.log('resposne : ' , data);
            // navigate('/center');
        }catch(err){
            console.log(err);
            setError(err.message);
        }

    };


    return (
      <>
        <div className="login-container align-items-center">
          
          <h2 className="py-3 form-heading text-center">Request</h2>
    
          <form className="py-4 px-5" onSubmit={handleSubmit} encType="multipart/form-data">
            <Input
              label="Fullname"
              type="text"
              placeholder="Enter your fullname"
              name="requestedBy"
              value={requestDetail.requestedBy}
              onChange={handleChange}
            />
             <select
              className='form-control'
                id="bloodType"
                name="bloodType"
                value={requestDetail.bloodType}
                onChange={handleChange}
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            <Input
              label="Blood Units"
              type="number"
              placeholder="Enter your blood Units"
              name="units"
              value={requestDetail.units}
              onChange={handleChange}
            />
            <Input
              label="Document"
              type="file"
              placeholder="Upload proof of document"
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
              <button type="submit" className="btn" id="btnSubmit">
                Request
              </button>
            </div>
          </form>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
        </div>
      </>
      );
}

export default Request