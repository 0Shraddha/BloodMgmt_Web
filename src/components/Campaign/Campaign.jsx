import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import '../../Styles/Input.scss'; // Assuming this has form styles
import Heading from '../Heading/Heading';

const Campaign = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    organizer: '',
    location: '',
    date: '',
    description: '',
  });

  const quillRef = useRef(null); // UseRef to avoid reinitializing Quill
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
    console.log(value)
  };

  // Custom Image Upload Handler
  // const handleImageUpload = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     const uploadFormData = new FormData();
  //     uploadFormData.append('image', file);

  //     const response = await fetch('https://api.example.com/upload', {
  //       method: 'POST',
  //       body: uploadFormData,
  //     });

  //     const data = await response.json();
  //     const range = quillRef.current.getEditor().getSelection();
  //     quillRef.current.getEditor().insertEmbed(range.index, 'image', data.url);
  //   };
  // };

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
      // handlers: {
      //   image: handleImageUpload,
      // },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to save campaign data');
      }

      const data = await response.json();
      console.log('Saved Data:', data);

      // Redirect to campaign list
      navigate('/campaignlist');
    } catch (error) {
      console.error('Error saving campaign data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="add-container px-5 py-4" style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Heading title="Campaign Form" />
      <form onSubmit={handleSubmit} className="addCampaignForm">
        <div className="row">
          <div className="form-group col-12 mb-3">
            <label htmlFor="campaignName">Campaign Name:</label>
            <input
              className="form-control"
              type="text"
              id="campaignName"
              name="campaignName"
              placeholder="Enter the campaign name..."
              value={formData.campaignName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group col-12 mb-3">
            <label htmlFor="organizer">Organizer:</label>
            <input
              className="form-control"
              type="text"
              id="organizer"
              name="organizer"
              placeholder="Enter event Organizer"
              value={formData.organizer}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="location">Location:</label>
            <input
              className="form-control"
              type="text"
              id="location"
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group col-md-6 mb-3">
            <label htmlFor="date">Event Date:</label>
            <input
              className="form-control"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group col-12 mb-3">
            <label htmlFor="description">Description:</label>
            <div className="quill-container">
              <ReactQuill
                ref={quillRef} // useRef to avoid re-initialization
                value={formData.description}
                onChange={handleQuillChange}
                modules={quillModules}
                theme="snow"
                style={{ minHeight: '150px' }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary px-4" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Campaign;
