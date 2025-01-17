import React from "react";
import './home.css'
function Home(){
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
              Simply choose a category of words, and then race against the clock to type their meanings
              before time runs out. Try to achieve your best score!
              Good luck! c:
              
            </p>

          </div>

        </div>
      )
}

export default Home