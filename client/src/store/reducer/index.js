import {
    GET_ALL_DOGS,
    GET_DETAIL_DOG,
    GET_TEMPERAMENTS,
    GET_DOG_BY_NAME,
    FILTER_BY_TEMP,
    FILTER_BY_ORIGIN,
    ORDER_BY_ALPHAB,
    ORDER_BY_WEIGHT,
    POST_DOG,
    CLEAR_DETAILS
} from '../constants'

import { orderByAlphabet, orderByWeight } from '../../helpers/'



const initialState = {
    allDogs: [], // work on this
    dogs: [], //render this
    allTemperaments: [],
    detail: {},
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        case FILTER_BY_TEMP:
            const tempers = state.allDogs
            const dogFilteredByTemper = action.payload === 'all' ? tempers
                : tempers.filter(e => e.temperaments && e.temperaments.includes(action.payload))
            return {
                ...state,
                dogs: dogFilteredByTemper
            }
        case FILTER_BY_ORIGIN:
            const origin = state.allDogs
            const filterByOrigin = action.payload === 'db'
                ? origin.filter(e => e.createdInDb === true)
                : origin.filter(e => e.createdInDb === false)
            return {
                ...state,
                dogs: action.payload === 'all'
                    ? state.allDogs
                    : filterByOrigin
            }
        case ORDER_BY_ALPHAB:
            return {
                ...state,
                dogs: orderByAlphabet(state.allDogs, action.payload)
            }
        case ORDER_BY_WEIGHT:

            return {
                ...state,
                dogs: orderByWeight(state.allDogs, action.payload)
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DETAIL_DOG:
            console.log('esto es /reducer -->', action.payload)
            return {
                ...state,
                detail: action.payload
            }
        case POST_DOG:
            return {
                ...state,
            }
        case CLEAR_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        default: return state
    }
};


export default reducer;