import React ,{ useState, useEffect} from 'react'
import Card from '../CardContent/Card'

const RequestHistory = ()=>{
    const [bloodRequested, setBloodRequested] = useState(null)
    

    useEffect(()=>{
        const loadBloodRequestHistory = async ()=>{
            try{
                const response = await fetch("http://localhost:5000/user/blood-request/ashok",{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }else{
                    const data = await response.json();
                    setBloodRequested(data)
                    console.log("data", data)
                }
            }catch(err){

            }
        }
        loadBloodRequestHistory()
    }, [])
    return(
        <>
            <h1>Requested Blood in Past</h1>
            {/* {
                bloodRequested && bloodRequested.map(request=>{
                    <Card 
                    title = {request.RequestedBy}
                    />
                })
            } */}
        </>
    )
}

export default RequestHistory;