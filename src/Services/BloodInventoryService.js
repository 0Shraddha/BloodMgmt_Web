import { toast } from 'react-toastify';

export const fetchCenterData = async () => {
    const method = 'GET';
    const url = 'http://localhost:5000/blood-inventory';

    const response = await fetch(url, {
        method,
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    return response.json();

}


export const addOrUpdateBloodData = async (centerData) => {
    const method = centerData._id ? 'PUT' : 'POST';
    const url = centerData._id
        ? `http://localhost:5000/blood-inventory/${centerData._id}`
        : 'http://localhost:5000/blood-inventory';

    const response = await fetch(url, {
        method,
        credentials: 'include',
        body: JSON.stringify({
            centerId: centerData.centerId,
            bloodType: centerData.bloodType,
            units: centerData.units,
            lastUpdated: centerData.lastUpdated,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    
    return response.json();
};

export const deleteBloodData = async(data) => {
        try {
            const response = await fetch(`http://localhost:5000/blood/${data._id}`, {
              method: 'DELETE',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Failed to delete the blood data');
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
    