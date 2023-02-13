import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../store/actions";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [dogs, setDogs] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    e.preventDefault();
    setDogs(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogByName(dogs));
    setDogs("");
  };

  return (
    <div className="-main-container-searchbar">


        <input
          className="input-searchbar"
          type="text"
          placeholder="Search... "
          value={dogs}
          onChange={(e) => {
            handleInput(e);
          }}
        />



        <button
        className="btn-searchbar"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {" "}
          search
        </button>

    </div>
  );
};

export default SearchBar;
