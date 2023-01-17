import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../store/actions';
import * as style from '../styles/DogCreater.module.css'




const validations = (input) => {
    let errors = {};

    if (!input.name) errors.name = 'name is mandatory, please choose one!'
    if (input.name.length > 50) errors.name = 'the dogs name is too long!, please try with a shorter one'
    if (!(/^[a-zA-Z]+$/).test(input.name)) errors.name = 'do not use special symbols!' //regular expression
    if (input.name.includes(0) || input.name.includes(1) || input.name.includes(2) || input.name.includes(3) || input.name.includes(4) || input.name.includes(5) || input.name.includes(6) || input.name.includes(7) || input.name.includes(8) || input.name.includes(9)) {
        errors.name = 'do not include numbers on the name!'
    }

    if (!input.weight_max) errors.weight_max = 'choose the weight for your new breed between 1 and 100 kgs!'
    if (input.weight_max < 1) errors.weight_max = 'the maximum weight for your new breed has to be between 1 and 100 kgs!'
    if (input.weight_max > 100) errors.weight_max = 'the maximum weight for your new breed has to be between 1 and 100 kgs!'

    if (!input.weight_min) errors.weight_min = 'choose the weight for your new breed between 1 and 100 kgs!'
    if (input.weight_min < 1) errors.weight_min = 'the minimum weight for your new breed it has to be between 1 and 100 kgs!'
    if (input.weight_min > 100) errors.weight_min = 'the minimum weight for your new breed it has to be between 1 and 100 kgs!'

    if (!input.height_max) errors.height_max = 'choose the height of your new breed between 1 to 100 cm'
    if (input.height_max < 1) errors.height_max = 'the height for your new breed has to be between 1 and 100cm'
    if (input.height_max > 100) errors.height_max = 'the height for your new breed has to be between 1 and 100cm'

    if (!input.height_min) errors.height_min = 'choose the height of your new breed between 1 to 100 cm'
    if (input.height_min < 1) errors.height_min = 'the height for your new breed has to be between 1 and 100cm'
    if (input.height_min > 100) errors.height_min = 'the height for your new breed has to be between 1 and 100cm'

    if (!input.life) errors.life = 'choose the longevity of your new breed'
    if (input.life < 1) errors.life = 'the longevity of your dog has to be longer than 1 year!'
    if (input.life > 18) errors.life = 'the longevity of your dog can not be longer than 18 years!'

    if (!input.temperaments) errors.temperaments = 'choose between 1 to 5 temperaments for your new breed'
    if (input.temperaments.length > 5) errors.temperaments = 'choose less than 5 temperaments for your new breed'

    if (!input.image) errors.image = 'paste the link from your favourite breed!'

    return errors;
};





export default function CreateDog() {


    const dispatch = useDispatch();
    const { dogs, allTemperaments } = useSelector(state => state);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        image: '',
        temperaments: [], //array allows me to set many 
        weight_max: '',
        weight_min: '',
        height_max: '',
        height_min: '',
        life: '',
        likes: ''
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])





    const handleChange = (e) => {
        const allBreeds = dogs.map(e => e.name)
        if (!allBreeds.includes(e.target.value)) {

            setInput({
                ...input,
                [e.target.name]: e.target.value
            })

            setErrors(validations({
                ...input,
                [e.target.value]: e.target.value
            }))
        }

    }

    const handleSelect = (e) => {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
            setErrors(validations({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            }))
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.name ||
            errors.image ||
            errors.temperaments ||
            errors.weight_max ||
            errors.weight_min ||
            errors.height_max ||
            errors.height_min ||
            errors.life ||
            !input.name
        ) {
            return alert('creation failed!, please complete the inputs')
        } else {
            dispatch(postDog(input))
            alert('dog created')
            setInput({
                name: '',
                image: '',
                temperaments: [],
                weight_max: '',
                weight_min: '',
                height_max: '',
                height_min: '',
                life: '',
            })
            history.push('/home')
        }
    }
console.log('esto es submit', input)

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== e)
        })
        setErrors(validations({
            ...input,
            temperaments: input.temperaments.filter(dt => dt !== e)
        }))
    }


    return (
        <div>
            <Link to='/home'><button> back </button></Link>
            <div  className={style.input}>
                <div>
                    <h1 className={style.h1}> Create a new breed </h1>
                </div>
                <div className='form'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className={style.label}>name: </label>
                            <input
                                type="text"
                                value={input.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />{
                                errors.name && (
                                    <p className={style.error}>{errors.name}</p>
                                )
                            }
                        </div>
                        <div>
                            <label className={style.label}>years life: </label>
                            <input
                                type="number"
                                value={input.life}
                                name='life'
                                onChange={(e) => handleChange(e)}
                            />{
                                errors.life && (
                                    <p className={style.error}>{errors.life}</p>
                                )
                            }
                        </div>
                        <div>
                            <label className={style.label}>min height: </label>
                            <input
                                type="number"
                                value={input.height_min}
                                name='height_min'
                                onChange={(e) => handleChange(e)}
                            />{
                                errors.height_min && (
                                    <p className={style.error}>{errors.height_min}</p>
                                )
                            }
                        </div>
                        <div>
                            <label className={style.label}>max height: </label>
                            <input
                                type="number"
                                value={input.height_max}
                                name="height_max"
                                onChange={(e) => { handleChange(e) }}
                            />
                            {
                                errors.height_max && (
                                    <p className={style.error}>{errors.height_max}</p>
                                )
                            }
                        </div>
                        <div>
                            <label className={style.label}>min weight: </label>
                            <input
                                type="number"
                                value={input.weight_min}
                                name="weight_min"
                                onChange={(e) => handleChange(e)}
                            />
                            {
                                errors.weight_min && (
                                    <p className={style.error}>{errors.weight_min}</p>
                                )
                            }
                        </div>
                        <div>
                            <label className={style.label}>max weight: </label>
                            <input
                                type="number"
                                value={input.weight_max}
                                name="weight_max"
                                onChange={(e) => handleChange(e)}
                            />
                            {
                                errors.weight_max && (
                                    <p className={style.error}>{errors.weight_max}</p>
                                )
                            }
                        </div>
                        <div>
                            <label> Likes </label>
                            <input 
                            value={input.likes}
                            type="number" 
                            name="likes"
                            onChange={(e) => handleChange(e)}
                             />
                        </div>
                        <div>
                            <select onChange={e => handleSelect(e)}>
                                {
                                    allTemperaments?.map(e => (
                                        <option value={e.name}>{e.name}</option>
                                    ))

                                }
                            </select>
                        </div>
                        <div>
                            <label className={style.label}>image: </label>
                            <input
                                type="text"
                                value={input.image}
                                name="image"
                                onChange={(e) => handleChange(e)}
                            />{
                                errors.image && (
                                    <p className={style.error}>{errors.image}</p>
                                )
                            }
                        </div>
                        <div>
                            <button type='submit'> create </button>
                        </div>
                    </form>
                    {
                        input.temperaments.map((e) =>
                            <div>
                                <p>{e}</p>
                                <button onClick={() => handleDelete(e)}>x</button>
                                {errors.temperaments && (<p className={style.error}>{errors.temperaments}</p>)}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
