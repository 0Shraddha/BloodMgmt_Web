import React, { useState, useEffect } from 'react';
import '../../Styles/CenterList.scss';
import DataTable from 'react-data-table-component';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const GetCenterList = () => {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState(null);

  // Fetch centers from the backend when the component loads
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('http://localhost:5000/center', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCenters(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCenters();
  }, []);

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      width: '55px',
    },
    {
      name: 'Center Name',
      selector: row => row.centerName,
      sortable: true,
      style: { color: '#404f9c', fontWeight: '500', textTransform: 'capitalize' },
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.phone,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <span style={{ cursor: 'pointer', marginRight: '10px' }}>
            <FaRegEdit size={'16px'} color='#fcba28'/>
          </span>
          <span style={{ cursor: 'pointer' }}>
            <MdDeleteOutline size={'17px'} color='#207ad8'/>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>

      {error ? (
        <p
          style={{
            color: '#D9534F',
            fontWeight: 'bold',
            fontSize: '1.1em',
            textAlign: 'center',
          }}
        >
          Error: {error}
        </p>
      ) : centers.length > 0 ? (
        <DataTable
          columns={columns}
          data={centers}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: '#f0f8ff',
                color: '#404f9c',
                fontWeight: 'bold',
                fontSize: '1.1em'
              },
            },
            rows: {
              style: {
                minHeight: '50px',
                fontSize: '.9em',
              },
            },
          }}
        />
      ) : (
        <p
          style={{
            color: '#D9534F',
            fontWeight: 'bold',
            fontSize: '1.1em',
            textAlign: 'center',
          }}
        >
          No centers found.
        </p>
      )}
    </div>
  );
};

export default GetCenterList;
