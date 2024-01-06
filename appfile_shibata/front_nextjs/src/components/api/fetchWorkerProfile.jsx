
const fetchWorker = async (worker_id) => {

    try {
        const staticData = await fetch(`http://127.0.0.1:5000/worker?worker_id=${worker_id}`);
        const responseData = await staticData.json(); // Parse JSON
        console.log(responseData);
        return responseData; // Return the entire response data
    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchWorker;

