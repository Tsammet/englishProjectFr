import React from "react";
import './home.css'
import { useNavigate } from "react-router-dom";
function Home(){
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate("/wordGame")
  };

  return (

        <div className="container">

          <div className="imageContainer">

            <img
              src="/images/homeCat.png"
              alt="Imagen de la aplicación"
              layout="fill"
              objectFit="cover"
              priority
            />

          </div>
    
          <div className="infoContainer">

          

            <h1 className="title">SC' SCHOOL</h1>

            <p className="description">
              SC APP Is not an app to learn english, SC APP is an app to practice your vocabulary
              in a fun way.
              <br />
              Simply choose a category of words, and then race against the clock to type their meanings
              before time runs out.
              <p className="parrafoTry">Try to achieve your best score!</p>
              Good luck!
              
            </p>

            <button className="buttonText" onClick={handleClick}>Play</button>


          </div>

        </div>
      )
}

export default Home