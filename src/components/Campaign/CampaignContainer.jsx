import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Heading from "../Heading/Heading";
import CampaignCard from "./CampaignCard";
import { useAuth } from "../AuthContext/AuthContext";


const CampaignContainer = ()=>{
    const { role } = useAuth();
	const userDetail = localStorage.getItem('userToken');
  
  	const parsedUser = JSON.parse(userDetail);
  	const parsedUserRole = parsedUser.role
    return(
        <>
            {parsedUserRole === 'admin' ? (
				<div className="row d-flex text-end"  style={{ marginTop:'60px', marginRight : '30px'}}>
					<ToastContainer position="top-right" autoClose={3000} />

				<span>
					<Link to="/campaign" className="btn text-end" id="btnSubmit">
						Add Campaign
					</Link>
				</span>
			</div>
			) : null}
			
			<div className=" mb-2">
				<Heading
					title="Campaign Details"
					desc="Join the donation camp events and save lives"
				/>
			</div>

			<br />

            <CampaignCard/>

        </>
    )
}

export default CampaignContainer