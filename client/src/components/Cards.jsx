import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cards.css";

//como le paso las propiedades por props no necesito un state,
//el state va a estar en home y le asigno un valor a cada prop
const Cards = ({
  id,
  image,
  name,
  temperaments,
  weight_max,
  weight_min,
  likes,
}) => {
  return (
    <div className="card">
      <div className="card-img">
        <Link to={`/home/${id}`} className='link-image-card'>
          <img src={image} alt="not found" className="img-home"/>
        </Link>
      </div>
      <div className="card-info">
        <h3>Breed: {name}</h3>
        <h5>Temperament: {temperaments}</h5>
        <h5>weight max: {weight_max}</h5>
        <h5>weight min: {weight_min}</h5>
        <h5>likes: {likes}</h5>
      </div>
    </div>
  );
};

export default Cards;
