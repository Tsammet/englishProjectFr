import React, { useState, useEffect } from "react";
import "./profile.css";

function Profile() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("profile_picture") || null);
    const [firstName, setFirstName] = useState(localStorage.getItem("first_name"));
    const [lastName, setLastName] = useState(localStorage.getItem("last_name"));
    const [age, setAge] = useState(localStorage.getItem("age"));
    const [gameScores, setGameScores] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem("token");

    const fetchGameScores = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                },
            });
            const data = await response.json();
            setGameScores(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        } catch (error) {
            console.error("Error fetching game scores:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameScores("http://localhost:8000/eW/game_score/get_user_scores/");
    }, [token]);

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
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.profile_picture) {
                    setImageUrl(data.profile_picture);
                    localStorage.setItem("profile_picture", data.profile_picture);
                }
                alert("Profile updated successfully");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                alert("Error updating profile");
            });
    };

    return (
        <div className="contenedor">
            <main>
                <section className="info-usuario">
                    <div
                        className="foto-perfil"
                        onMouseEnter={() => setShowForm(true)} 
                        onMouseLeave={() => setShowForm(false)} 
                    >
                        {imageUrl ? (
                            <img
                                src={`http://127.0.0.1:8000${imageUrl}`}
                                alt="Profile"
                                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                            />
                        ) : (
                            <p>No profile picture uploaded</p>
                        )}
                        {showForm && (
                            <form onSubmit={handleSubmit} className="actualizar-perfil">
                                <label htmlFor="profile_picture">Change Profile Picture:</label>
                                <input
                                    type="file"
                                    id="profile_picture"
                                    name="profile_picture"
                                    onChange={handleImageChange}
                                />
                                <button type="submit">Update Profile</button>
                            </form>
                        )}
                    </div>
                    <div className="detalles-usuario">
                        <h2 id="nombre-usuario">Username: {localStorage.getItem("username")}</h2>
                        <p>
                            <strong>Nombre:</strong> <span id="First Name">{firstName}</span>
                        </p>
                        <p>
                            <strong>Apellido:</strong> <span id="Last Name">{lastName}</span>
                        </p>
                        <p>
                            <strong>Edad:</strong> <span id="Age">{age}</span>
                        </p>
                    </div>
                </section>
                <section className="puntajes-juego">
                    <h3>Game Scores:</h3>
                    {loading ? (
                        <p>Loading game scores...</p>
                    ) : gameScores.length === 0 ? (
                        <p>No game scores available</p>
                    ) : (
                        <table id="tabla-puntajes">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameScores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.category}</td>
                                        <td>{score.score}</td>
                                        <td>{new Date(score.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
                <div className="paginacion">
                    <button
                        onClick={() => fetchGameScores(previousPage)}
                        disabled={!previousPage}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => fetchGameScores(nextPage)}
                        disabled={!nextPage}
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Profile;
