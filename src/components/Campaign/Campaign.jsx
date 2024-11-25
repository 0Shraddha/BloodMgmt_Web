import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate,useLocation } from 'react-router-dom';


import 'react-quill/dist/quill.snow.css';
import '../../Styles/Input.scss'; // Assuming this has form styles
import Heading from '../Heading/Heading';

const Campaign = ({ isEdit = false }) => {
  const location = useLocation();
  const initialData = location.state?.campaign || {};

  const [formData, setFormData] = useState({
    campaignName: initialData.campaignName || '',
    organizer: initialData.organizer || '',
    location: initialData.location || '',
    date: initialData.date || '',
    description: initialData.description || '',
  });

  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        campaignName: initialData.campaignName || '',
        organizer: initialData.organizer || '',
        location: initialData.location || '',
        date: initialData.date || '',
        description: initialData.description || '',
      });
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEdit
      ? `http://localhost:5000/campaign/${initialData._id}`
      : 'http://localhost:5000/campaign';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} campaign`);
      }

      const data = await response.json();
      console.log(`${isEdit ? 'Updated' : 'Created'} Data:`, data || "Campaign updated successfully!");

      navigate('/campaign-list');
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} campaign:`, error);
      alert(`Failed to ${isEdit ? 'update' : 'create'} campaign. Please try again.`);
    }
  };

  return (
    <div
      className="add-container px-5 py-4"
      style={{
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Heading title={isEdit ? 'Edit Campaign' : 'Create Campaign'} />
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
              placeholder="Enter event organizer"
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
              min={getTomorrowDate()}
              required
            />
          </div>

          <div className="form-group col-12 mb-3">
            <label htmlFor="description">Description:</label>
            <div className="quill-container">
              <ReactQuill
                ref={quillRef}
                value={formData.description}
                onChange={handleQuillChange}
                modules={quillModules}
                theme="snow"
                style={{ height: '150px', marginBottom: '35px' }}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary px-4" type="submit">
            {isEdit ? 'Update' : 'Submit'}
          </button>
          {isEdit && (
            <button
              className="btn btn-secondary px-4 ms-2"
              type="button"
              onClick={() => navigate('/campaign-list')}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Campaign;
