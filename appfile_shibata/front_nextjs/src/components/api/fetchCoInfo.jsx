
const fetchCompanyInfo = async (company_id) => {

    try {
        const staticData = await fetch(`http://127.0.0.1:5000/company?company_id=${company_id}`);
        const responseData = await staticData.json(); // Parse JSON
        console.log("取得したFetchデータ"+responseData);
        return responseData; // Return the entire response data
    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default fetchCompanyInfo;
