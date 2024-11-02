import React, {useState} from 'react'
import Input from '../Registration/Input'
import '../../Styles/Input.scss';

const Request = () => {

    const [requestDetail, setRequestDetail] = useState({
        requestedBy : '',
        date : '',
        reason : '',
        document : '',
    })
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRequestDetail((prevValues) => ({
            ...prevValues,
            [ name ] : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:5000//blood-request',{
                method : 'POST',
                credentials : 'include',
                body: JSON.stringify({ 
                    requestedBy : requestDetail.requestedBy,
                    date : requestDetail.date,
                    reason : requestDetail.reason,
                    document : requestDetail.document}),
                headers : {
                    'Content-Type' : 'application/json',
                },
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
        <div className="login-container align-items-center">
          <h2 className="py-3 form-heading text-center">Request</h2>
    
          <form className="py-4 px-5" onSubmit={handleSubmit}>
            <Input
              label="Fullname"
              type="text"
              placeholder="Enter your fullname"
              name="requestedBy"
              value={requestDetail.requestedBy}
              onChange={handleChange}
            />
            <Input
              label="Date"
              type="date"
              placeholder="Book a date"
              name="date"
              value={requestDetail.date}
              onChange={handleChange}
            />
            <Input
              label="Document"
              type="file"
              placeholder="Upload proof of document"
              name="document"
              value={requestDetail.document}
              onChange={handleChange}
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
      );
}

export default Request