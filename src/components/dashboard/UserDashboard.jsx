

import { React } from 'react'
import HeartFill from "../Charts/HeartFill";


const UserDashboard = () => {


    return (
        <>

            <div className="row py-3 px-2">
                <div className="col-6 mb-3 d-flex gap-5">
                    <div className="col"><HeartFill percentage={78} bloodType="A+" /></div>
                    <div className="col"><HeartFill percentage={18} bloodType="A-" /></div>
                    <div className="col"><HeartFill percentage={28} bloodType="B+" /></div>
                    <div className="col"><HeartFill percentage={55} bloodType="B-" /></div>
                </div>
                <div className="col-6"></div>

                <div className="col-6 d-flex gap-5">
                    <div className="col"><HeartFill percentage={60} bloodType="AB+" /></div>
                    <div className="col"><HeartFill percentage={47} bloodType="AB-" /></div>
                    <div className="col"><HeartFill percentage={68} bloodType="O+" /></div>
                    <div className="col"><HeartFill percentage={38} bloodType="O-" /></div>
                </div>

            </div>

        </>
    );
}

export default UserDashboard;