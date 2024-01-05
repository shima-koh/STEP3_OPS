
const fetchActivePosts = async () => {

    try {
        const staticData = await fetch('http://127.0.0.1:5000/activePosts');
        const responseData = await staticData.json(); // Parse JSON
        return responseData; // Return the entire response data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchActivePosts;

