const InsertOrder = async (post_id) => {

    try {
            const res = await fetch(`http://127.0.0.1:5000/InsertOrder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id: post_id }), // JSON形式に変換
        });

        return res; // Return the entire response data

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default InsertOrder;