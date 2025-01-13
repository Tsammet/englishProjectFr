import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './wordGame.css'

function WordGame() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(5);
    const [category, setCategory] = useState("");
    const [words, setWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [answer, setAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(5);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        let timer;
        if (timeLeft > 0 && step === 3) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            changeWord();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, step]);

    const fetchWords = () => {
        fetch(`http://localhost:8000/eW/words/get_random/?count=${count}&category=${encodeURIComponent(category)}`, {
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
                setWords(data);
                setCurrentWord(data[0]);
                setTimeLeft(10);
                setStep(3); 
            })
            .catch((error) => setError(error.message));
    };

    const changeWord = () => {
        if (words.length === 1) {
            if (answer.toLowerCase() === currentWord.meaning.toLowerCase()) {
                setScore(score + 1);
            }
            alert(`Game Over! Your score is: ${score + 1}`);
            navigate("/home");
            return;
        }

        if (words.length > 1) {
            const remainingWords = words.slice(1);
            setWords(remainingWords);
            setCurrentWord(remainingWords[0]);
            setTimeLeft(10); 
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (answer.toLowerCase() === currentWord.meaning.toLowerCase()) {
            setScore(score + 1);
        }
        setAnswer("");
        changeWord();
    };

    return (
        <div className="game-container">
            {step === 1 && (
                <div className="settings">
                    <h2>Select Number of Words</h2>
                    <div className="input-group">
                        <label htmlFor="count">Number of Words:</label>
                        <input
                            type="number"
                            id="count"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            min="1"
                            max="10"
                        />
                    </div>
                    <button onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
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
                </div>
            )}

            {step === 3 && currentWord && (
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
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p>Score: {score}</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
        </div>
    );
}
    
export default WordGame;
