
const fetchWorkerSkill= async (worker_id) => {

    try {
        const res = await fetch(`http://127.0.0.1:5000/workerSkill?worker_id=${worker_id}`);
        const responseData = await res.json(); // Parse JSON

        console.log("APISKILLS:" + responseData);
        if(responseData){
        console.log(responseData);}
        return responseData; // Return the entire response data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchWorkerSkill;