import React, { useEffect, useState } from 'react';

const Inventory = () => {
    const [inventoryContent, setInventoryContent] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get the logged-in user's uid from localStorage
        const uid = JSON.parse(localStorage.getItem('morp-login-user')); // Parse the user ID from localStorage
        console.log(`uid: ${uid}`);
        if (uid) {
            console.log(`Fetching user_id for uid: ${uid}`);
            // Fetch the user_id based on the uid
            fetch(`http://localhost/morpwebsite-master/src/php/getUserId.php?uid=${uid}`)
                .then(response => response.json())
                .then(data => {
                    if (data.user_id) {
                        setUserId(data.user_id);
                    } else {
                        console.error('Error fetching user_id:', data.error);
                    }
                })
                .catch(error => console.error('Error fetching user_id:', error));
        }
    }, []);

    useEffect(() => {
        if (userId) {
            console.log(`Fetching inventory content for user_id: ${userId}`);
            // Fetch the inventory content assigned to the user_id
            fetch(`http://localhost/morpwebsite-master/src/php/getInventoryContent.php?user_id=${userId}`)
                .then(response => response.json())
                .then(data => {
                    setInventoryContent(data);
                })
                .catch(error => console.error('Error fetching inventory content:', error));
        }
    }, [userId]);

    return (
        <div>
            <h1>Inventory</h1>
            <ul>
                {inventoryContent.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
