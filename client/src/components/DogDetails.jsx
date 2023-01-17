import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { clearDetails, getDetailsDogs } from '../store/actions';
import * as style from '../styles/DogDetails.module.css'



const DogDetails = () => {
    const dog = useSelector(state => state.detail)
    const dispatch = useDispatch()
    const { id } = useParams();


console.log('esto es dog', dog)


    useEffect(() => {
        dispatch(getDetailsDogs(id))
        return (dispatch(clearDetails()))
    }, [dispatch, id])


    return dog.length ? 
        (
        <div>
            <Link to='/home' className="paraVolver"><button> back </button></Link>

            <div className={style.card} key={dog.id}>

                <img src={dog[0].image} alt="" className={style.image} />
                <h3>Breed: {dog[0].name}</h3>
                <h4>Temperaments: {dog[0].temperaments}</h4>
                <h5>max weight: {dog[0].weight_max} kg</h5>
                <h5>min weight: {dog[0].weight_min} kg</h5>
                <h5>max height: {dog[0].height_max} cm</h5>
                <h5>min height: {dog[0].height_min} cm</h5>
                <h5>max life: {dog[0].life}</h5>
            </div>
        </div>
    ) : (
        (
            <div>
                <Link to='/home' className="paraVolver"><button> back </button></Link>
    
                <div className={style.card} key={dog.id}>
    
                    <img src={dog.image} alt="" className={style.image} />
                    <h3>Breed: {dog.name}</h3>
                    <h4>Temperaments: {dog.temperaments instanceof Array ? dog.temperaments.map(e => e.name).join(', ') : dog.temperaments ? dog.temperaments : "no temperaments"}</h4>
                    <h5>max weight: {dog.weight_max} kg</h5>
                    <h5>min weight: {dog.weight_min} kg</h5>
                    <h5>max height: {dog.height_max} cm</h5>
                    <h5>min height: {dog.height_min} cm</h5>
                    <h5>max life: {dog.life}</h5>
                </div>
            </div>
        )
    )
} 


export default DogDetails;