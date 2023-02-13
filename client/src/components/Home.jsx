import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Pages from "./Pages";
import SearchBar from "./SearchBar";
import {
  getAllDogs,
  getTemperaments,
  filterByTemperaments,
  filterByOrigin,
  orderByAlphabet,
  orderByWeight,
} from "../store/actions";
import "../styles/Home.css";
import image_default from "../images/image_default.avif";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //state de dogs. SIMILAR A MAPSTATETOPROPS
  const tempes = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  // ------------------------- PAGINADO ----------------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [dogPerPage, setDogPerPage] = useState(8);

  const indexLastDog = currentPage * dogPerPage;
  const indexFirstDog = indexLastDog - dogPerPage;
  const pageDog = allDogs.slice(indexFirstDog, indexLastDog); //esta constante es la que muestra los dogs en la APP

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterOrigin = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setCurrentPage(1);
  };
  const handleFilterTemperaments = (e) => {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
  };
  const handleSortAlphabet = (e) => {
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value));
    setCurrentPage(1);
  };
  const handleSortWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllDogs());
  };

  return (
    <div className="home-container">
      <div className="nav-bar">
        <div className="reload-btn">
          <button
            className="btn"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {" "}
            Reload{" "}
          </button>
        </div>

        <div className="search-bar">
          <SearchBar />
        </div>

        <div className="create-btn">
          <Link to="/create" className="btn">
            Let's create
          </Link>
        </div>
      </div>

      <div className="container-filters">
        <div className="div-sort">
          <select
          className="select-home"
            defaultValue="alph"
            onChange={(e) => {
              handleSortAlphabet(e);
            }}
          >
            <option disabled>order by alphabet</option>
            <option value="A-Z">A - Z</option>
            <option value="Z-A">Z - A</option>
          </select>
        </div>

        <div className="div-sort">
          <select
          className="select-home"
            defaultValue="weight"
            onChange={(e) => {
              handleSortWeight(e);
            }}
          >
            <option disabled> order by weight</option>
            <option value="Min-Max">Min to Max</option>
            <option value="Max-Min">Max to Min</option>
          </select>
        </div>

        <div className="div-filter">
          <select
          className="select-home"
            defaultValue="origin"
            onChange={(e) => {
              handleFilterOrigin(e);
            }}
          >
            <option disabled>filter by origin</option>
            <option value="all">All</option>
            <option value="api">Original</option>
            <option value="db">Created</option>
          </select>
        </div>

        <div className="div-filter">
          <select
          className="select-home"
            defaultValue="temperaments"
            onChange={(e) => {
              handleFilterTemperaments(e);
            }}
          >
            <option> filter by temperament</option>
            <option value="all">All</option>
            {tempes.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cards-container">
        {pageDog.length ? (
          pageDog?.map((e, index) => {
            return (
              <div className="cards" key={index}>
                <Cards
                  id={e.id}
                  name={e.name}
                  image={e.image ? e.image : image_default}
                  temperaments={
                    e.temperaments instanceof Array
                      ? e.temperaments.map((e) => e.name).join(", ")
                      : e.temperaments
                      ? e.temperaments
                      : "no temperaments"
                  }
                  weight_max={e.weight_max}
                  weight_min={e.weight_min}
                  height_max={e.height_max}
                  likes={e.likes ? e.likes : ""}
                />
              </div>
            );
          })
        ) : (
          <p>CHARGIN!</p>
        )}
      </div>

      <div className="pages-container">
        <Pages dogPerPage={dogPerPage} allDogs={allDogs.length} pages={pages} />
      </div>
    </div>
  );
}

export default Home;
