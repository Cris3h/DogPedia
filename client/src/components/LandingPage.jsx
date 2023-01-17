import React from 'react';
import { Link } from 'react-router-dom';
import * as style from '../styles/LandingPage.module.css'


const LandingPage = () => (
    <div className ={style.landing}>
        <div className>
            <h1 className={style.title}>Welcome to the Dogs APP!</h1>
        </div>
        <div className>
            <Link to='/home'><button className={style.btn}>Let's start!</button></Link>
        </div>
        <div className={style.extra}>
            <h3 className>   -Search for you favourite bread </h3>
            <h3 className>   -Try our dog creator! </h3>
            
        </div>
        
    </div>
)


export default LandingPage;