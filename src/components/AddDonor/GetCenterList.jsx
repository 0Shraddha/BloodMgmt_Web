import React, { useState, useEffect } from 'react';
import '../../Styles/CenterList.scss';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

const GetCenterList = () => {
  const [centers, setCenters] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      width: '400px',

    },
    {
      name: 'Location',
      selector: row => row.location,
      width: '350px',
      sortable: true,
    },
    {
      name: 'Contact',
      selector: row => row.phone,
      width: '200px',

    },
    {
      name: 'Email',
      selector: row => row.email,
      width: '300px',
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <span style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(row)}>
            <FaRegEdit size={'16px'} color='#fcba28'/>
          </span>
          <span style={{ cursor: 'pointer' }} onClick={()=> handleDelete(row)}>
            <MdDeleteOutline size={'17px'} color='#e1002d'/>
          </span>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    const centerId = row._id;

    const fetchEditCenters = async () => {
      try {
        const response = await fetch('http://localhost:5000/center/'+centerId, {
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
        console.log(data);
        navigate('/add-center',{ state: { centerData: row } })
        
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEditCenters();
  }

  const handleDelete = (row) => {
    const centerId = row._id;
  
    const deleteData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/center/${centerId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const data = await response.json(); 
          toast.error(data.message);
        }else{
          toast.success("Successfully deleted!");
          setTimeout(() => {
            location.reload();
          }, 2000);
        }

       
        
      } catch (error) {
        // Handle error (e.g., display error message)
        toast.error(error.message); // Show error toast
        console.error(error); // Log the error for debugging
      }
    };
  
    deleteData();
  };
  

  return (
    <div>
            <ToastContainer position="top-right" autoClose={3000} />


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
