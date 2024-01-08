
const fetchFBs= async (worker_id) => {

    try {
        const res = await fetch(`http://127.0.0.1:5000/fbs?worker_id=${worker_id}`);
        const responseData = await res.json(); // Parse JSON

        console.log("API:" + responseData);
        return responseData; // Return the entire response data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchFBs;