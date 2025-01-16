import React, { useState, useEffect } from "react";

function Profile() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem('profile_picture') || null);
    const [firstName, setFirstName] = useState(localStorage.getItem('first_name'));
    const [lastName, setLastName] = useState(localStorage.getItem('last_name'));
    const [age, setAge] = useState(localStorage.getItem('age'));
    const [gameScores, setGameScores] = useState([]);  // Agregar estado para los puntajes
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');  // Obtener el ID del usuario desde el localStorage o JWT
    console.log("User ID from localStorage:", userId);  // Verificar el valor de userId

    // Fetch user profile data
    useEffect(() => {
        fetch("http://127.0.0.1:8000/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setAge(data.age);
            setImageUrl(data.profile_picture);
        })
        .catch(error => console.error("Error fetching profile data:", error));

        // Fetch game scores
        fetch("http://localhost:8000/eW/game_score/get_user_scores/", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            
            const userScores = data.filter(score => score.user === parseInt(userId)); 
            setGameScores(userScores);  
        })
        .catch(error => console.error("Error fetching game scores:", error));
    }, [token, userId]);

    const handleImageChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }
        formData.append("age", age);

        fetch("http://127.0.0.1:8000/user/profile", {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.profile_picture) {
                setImageUrl(data.profile_picture);
                localStorage.setItem('profile_picture', data.profile_picture);
            }
            alert("Profile updated successfully");
        })
        .catch(error => {
            console.error("Error updating profile:", error);
            alert("Error updating profile");
        });
    };

    return (
        <div>
            <h1>Username: {localStorage.getItem('username')}</h1>
            <h1>First Name: {firstName}</h1>
            <h1>Last Name: {lastName}</h1>
            <h1>Age: {age}</h1>

            {imageUrl ? (
                <img
                    src={`http://127.0.0.1:8000${imageUrl}`}
                    alt="Profile"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
            ) : (
                <p>No profile picture uploaded</p>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="profile_picture">Change Profile Picture:</label>
                    <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        onChange={handleImageChange}
                    />
                </div>

                <button type="submit">Update Profile</button>
            </form>

            <div>
                <h3>Game Scores:</h3>
                {gameScores.length === 0 ? (
                    <p>No game scores available</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th >Category</th>
                                <th >Score</th>
                                <th >Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gameScores.map((score, index) => (
                                <tr key={index}>
                                    <td>
                                        {score.category}
                                    </td>
                                    <td>
                                        {score.score}
                                    </td>
                                    <td>
                                        {new Date(score.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Profile;
