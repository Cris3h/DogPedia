import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import bground from "../images/bground.jpg";

const LandingPage = () => {
  let image = bground;
  return (
    <div className="landing-container">
      <div className="section-landing-title">
        <h2 className="landing-title">Welcome to the DoggyPedia!</h2>
      </div>

      <div className="image-landing">
        <img className="img-landing" src={image} alt="reading dog" />
      </div>

      <div className="extras">
        <div className="extra">
          <h4 className="landing-title-more">
            {" "}
            - Search for you favourite breed{" "}
          </h4>
        </div>
        <div className="extra">
          <h4 className="landing-title-more">
            - Find the best breeds and have fun with the fluffly ones!
          </h4>
        </div>
        <div className="extra">
          <h4 className="landing-title-more"> - Try our dog creator! </h4>
        </div>
      </div>

      <div className="landing-btn-container">
        <Link to="/home">
          <button className="landing-btn">Let's start!</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
