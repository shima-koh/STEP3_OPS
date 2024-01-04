
const fetchLogin = async ({worker_id, worker_pw}) => {

    console.log("worker_id");
    console.log(JSON.stringify(worker_id, worker_pw));
    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({worker_id, worker_pw}),
        });

        if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchLogin;