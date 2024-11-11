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
