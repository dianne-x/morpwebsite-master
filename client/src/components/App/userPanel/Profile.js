import React, { useState, useEffect } from "react";
import '../../../style/App/userPanel/profile.scss';
import { getWebSocket } from '../../../utils/websocket'; // Import WebSocket utility

const Profile = (props) => {
    const [userData, setUserData] = useState({
        profile_pic_path: '',
        name: '',
        email: '',
        nickname: '',
        about_me: '',
    });

    const [tempProfilePic, setTempProfilePic] = useState(''); // Temporary variable for profile picture
    const [profilePicFile, setProfilePicFile] = useState(null); // File object for profile picture

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value || '', // Ensure value is not null
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicFile(file); // Set the file object
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfilePic(reader.result); // Set the temporary profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (profilePicFile) {
            formData.append('profile_pic', profilePicFile); // Append the file object
        }
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('nickname', userData.nickname);
        formData.append('about_me', userData.about_me);

        console.log('Submitting form data:', formData); // Log the form data

        fetch(`${process.env.REACT_APP_PHP_BASE_URL}/updateUser.php`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                console.log('Response:', response); // Log the response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Response data:', data); // Log the response data
                if (data.success) {
                    alert('User data saved successfully.');
                    fetchUserProfile(); // Refresh the profile data
                } else {
                    alert('Failed to save user data.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while saving user data.');
            });
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const userId = localStorage.getItem('morp-login-user');
        if (!userId) {
            alert('User ID not found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_PHP_BASE_URL}/getProfileData.php?userId=${userId}`);
            const data = await response.json();
            if (data.success) {
                setUserData(data.user);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the profile data.');
        }
    };

    const handleLogOut = () => {
        // Disconnect from WebSocket
        const ws = getWebSocket();
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close(); // Close the WebSocket connection
            console.log('WebSocket connection closed.');
        }

        // Clear user data from localStorage
        localStorage.removeItem('morp-login-user');

        // Call the parent LogOut function (if provided)
        if (props.LogOut) {
            props.LogOut();
        }
    };

    return (
        <>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <label 
                    htmlFor="profile_pic" id="pic-label"
                    style={{backgroundImage: `url(${tempProfilePic || `${process.env.REACT_APP_IMAGE_BASE_URL}/userPictures/${userData.profile_pic_path}`})`}}>
                </label>
                <input 
                    type="file"
                    name="profile_pic"
                    id="profile_pic"
                    onChange={handleFileChange}
                />
                <label>
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={userData.name || ''} // Ensure value is not null
                    onChange={handleInputChange}
                />
                <label>
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={userData.email || ''} // Ensure value is not null
                    onChange={handleInputChange}
                />
                <label>
                    Nickname
                </label>
                <input
                    type="text"
                    name="nickname"
                    value={userData.nickname || ''} // Ensure value is not null
                    onChange={handleInputChange}
                />
                <label>
                    About me
                </label>
                <textarea
                    type="text"
                    name="about_me"
                    value={userData.about_me || ''} // Ensure value is not null
                    onChange={handleInputChange}
                />
                
                <button type="submit">Save</button>
            </form>
            <button style={{color: 'red'}} onClick={handleLogOut} className="logout-btn">
                Log out
            </button>
        </>
    )
}

export default Profile;