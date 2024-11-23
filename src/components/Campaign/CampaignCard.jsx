import React from 'react';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const CampaignCard = () => {
    return (
        <>
        <div className="row d-flex text-end">
          <ToastContainer position="top-right" autoClose={3000} />

            <span>
              <Link to="/campaign" className="btn text-end" id="btnSubmit">
                Add Campaign
              </Link>
            </span>
          </div>
        <Heading title='Campaign Details' desc='Join the donation camp events and save lives' />

        <br />
        <div className="card" style= {{ width : '23rem'}}>
            <div className="card-body">
                <h5 className="card-title py-1">Youth Led Donation Camp</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                <MdLocationOn size={18} color="#444" /> <span>Location, Address</span>
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                <MdAccessTime size={18} color="#444" /> <span>2034-12-01</span>
                </h6>
                <p className="card-text py-2">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                <a href="#" className="card-link">Card link</a>
            </div>
        </div>
        </>
    );
}

export default CampaignCard;