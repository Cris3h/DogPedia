import React from "react";
import * as style from '../styles/Pages.module.css'

const Pages = ({ dogPerPage, allDogs, pages }) => {
    const pageNumber = []

    for (let i = 1; i<= Math.ceil(allDogs / dogPerPage); i++){
        pageNumber.push(i)
    }

    return (
        <nav className={style.pages}>
            <span >
                {
                    pageNumber && pageNumber.map((number, index) => (
                        <div className={style.number} key={index}>
                            <button className={style.bn5}  onClick={() => pages(number)}>{number}</button>
                        </div>
                    ))
                }
            </span>
        </nav>
    )
}

//1) le paso como propiedad lo declarado en Home
//2) declaro un arreglo vacio
//3)divido y recorro lo resultante de todos los dogs dividido dogsPerPage(8) = 21,5 ---> en el renderizado nos muestra 22 páginas
//  convierto ese resultado en entero con math.ceil() "devuelve el entero mayor o igual más próximo a un número dado."
//4)ese resultado lo pusheo en pageNumber

export default Pages;