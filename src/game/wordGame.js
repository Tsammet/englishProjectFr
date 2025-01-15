import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './wordGame.css';

function WordGame() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState("");
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        let timer;
        if (timeLeft > 0 && step === 2) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            endGame();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, step]);

    const fetchWords = () => {
        fetch(`http://localhost:8000/eW/words/get_random/?category=${encodeURIComponent(category)}`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch words");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    throw new Error("No words found for the selected category.");
                }
                setWords(data);
                setCurrentWord(data[0]);
                setStep(2); 
            })
            .catch((error) => setError(error.message));
    };

    const changeWord = () => {
        if (words.length > 1) {
            const remainingWords = words.slice(1);
            setWords(remainingWords);
            setCurrentWord(remainingWords[0]);
        } else {
            fetchWords(); 
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (timeLeft > 0) { 
            if (answer.toLowerCase() === currentWord.meaning.toLowerCase()) {
                setScore(score + 1);
            } else {
                setScore(score - 1);
            }
            setAnswer("");
            changeWord();
        }
    };

    const endGame = () => {
        alert(`Game Over! Your score is: ${score}`);
        navigate("/wordGame");
    };

    return (
        <div className="game-container">
            {step === 1 && (
                <div className="settings">
                    <h2>Select Category</h2>
                    <div className="input-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <button onClick={fetchWords}>Start Game</button>
                    {error && <p className="error">{error}</p>}
                </div>
            )}

            {step === 2 && currentWord && (
                <div className="game-play">
                    <h3>Time Left: {timeLeft}s</h3>
                    <p>Word: {currentWord.word}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter the meaning"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            disabled={timeLeft === 0}
                        />
                        <button type="submit" disabled={timeLeft === 0}>Submit</button>
                    </form>
                    <p>Score: {score}</p>
                </div>
            )}
        </div>
    );
}

export default WordGame;
