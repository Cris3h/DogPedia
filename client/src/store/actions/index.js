import axios from 'axios'
import {GET_ALL_DOGS,
    GET_DETAIL_DOG,
    GET_TEMPERAMENTS,
    GET_DOG_BY_NAME,
    FILTER_BY_TEMP,
    FILTER_BY_ORIGIN,
    ORDER_BY_ALPHAB,
    ORDER_BY_WEIGHT,
    POST_DOG,
    CLEAR_DETAILS } from '../constants'




export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/dogs')
            return dispatch({
                type: GET_ALL_DOGS,
                payload: response.data
            })
        }
        catch (e) {
            alert(`problem: ${e}`)
        }
    }
}

export const getDogByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: response.data
            })
        } catch (e) {
            alert(`problem: ${e}`)
        }
    }
}
export const getDetailsDogs = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`) 
            console.log('esto es getDetailsDogs /actions --> ', response.data)
            return dispatch({
                type: GET_DETAIL_DOG,
                payload: response.data
            })
        }
        catch (e) {
            alert(`problem: ${e}`)
        }
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/temperaments')
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data
            })
        } catch (e) {
            alert(`problem: ${e}`)
        }
    }
}


export const filterByTemperaments = (payload) => {
    return {
        type: FILTER_BY_TEMP,
        payload
    }
}

export const filterByOrigin = (payload) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export const orderByAlphabet = (payload) => {
    return {
        type: ORDER_BY_ALPHAB,
        payload
    }
}

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}




export const postDog = (payload) => {
    return async function(){
        const response = await axios.post(`http://localhost:3001/dogs`, payload)
        return response;
    }
}


export const clearDetails = ()=> {
    return {
        type: CLEAR_DETAILS,
        payload: []
    }
};