import React from 'react'
import Input from '../../components/Registration/Input'
import '../../Styles/Input.scss';
import Heading from '../Heading/Heading';


const Campaign = () => {
  return (
    <>
    <div className="add-container px-5 py-4">
      <Heading title='Campaign Form'/>
                <form action="" className='addCampaignForm'>
                    <div className='row'>
                       <div className="px-0" style={{marginBottom: '10px'}}>
                            <Input label="Center Name: " type="text" id="centername" name="centerName" placeholder="Enter the center name... " />
                        </div>
                        <div className="col-12 d-flex py-1 px-1 gap-2" style={{marginBottom: '10px'}}>
                            <div className="col-12">
                                <Input label="Title: " name="title" id="title" placeholder="Enter event title " type="text" />
                            </div>
                        </div>
                        <div className="px-0 col-6">
                        <Input label="Location: " name="location" id="location" placeholder="Enter event location " type="text" />
                        </div>
                        <div className="col-6">
                            <Input label="Event Date: " name="date" id="date" placeholder="Enter your phone number " type="date" />
                        </div>

                        <div className="col-12 d-flex py-1 px-1 gap-2" style={{marginBottom: '10px', marginTop: '10px'}}>
                             <div className="col-12">
                                <Input textarea label="Description: " name="description" id="description" placeholder="Enter your description "  />
                              </div>
                        </div>
                        </div>
                        <div>
                            <button className='btn' id="btnAdd">Submit</button>
                        </div>
            </form>
    </div>
    </>
  )
}

export default Campaign