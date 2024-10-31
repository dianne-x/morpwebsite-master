import React, {useState, useEffect} from "react";
import '../../../style/App/userPanel/profile.scss';

const Profile = (props) => {

    const [userData, setUserData] = useState({
        profile_pic_path: '',
        name: '',
        email: '',
        nickname: '',
        about_me: '',
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value, // Dynamically update the appropriate field in the userData state
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (reloading the page)

    fetch(`http://localhost/morpwebsite-master/src/php/updateUser.php`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send the updated user data to the server
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then((data) => {
        if (data.success) {
            alert('User data saved successfully.');
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
        const response = await fetch(`http://localhost/morpwebsite-master/src/php/getProfileData.php?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
            setUserData(data.user); // Assuming the API returns user data in the format expected.
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the profile data.');
    }
    };


    return (
      <>
          <h2>Profile</h2>
          <form onSubmit={handleSubmit}> {/* Use form with onSubmit handler */}
              <label 
                htmlFor="profile_pic" id="pic-label"
                style={{backgroundImage: `url(http://localhost/morpwebsite-master/src/pictureData/userPictures/${userData.profile_pic_path})`}}>
              </label>
              <input 
                type="file"
                name="profile_pic"
                id="profile_pic"
              />
            <label>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange} // Add onChange handler
            />
            <label>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange} // Add onChange handler
            />
            <label>
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={handleInputChange} // Add onChange handler
            />
            <label>
              About me
            </label>
            <input
              type="text"
              name="about_me"
              value={userData.about_me}
              onChange={handleInputChange} // Add onChange handler
            />
            
            <button type="submit">Save</button> {/* Use button of type "submit" */}
          </form>
          <button style={{color: 'red'}} onClick={props.LogOut} className="logout-btn">
            Log out
          </button>
        </>
    )
}

export default Profile;