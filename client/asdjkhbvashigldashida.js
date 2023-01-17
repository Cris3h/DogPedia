import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom'

import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import "../../../styles/review.css";


import { purchasesMade, product, paproba } from "./pruebas";
import { postReview } from '../../../redux/features/reviews/reviewsActions'

import  StarsReview  from "../../StarsReview/StarsReview";
import InputChangeRating from '../../StarsReview/InputChangeRating'

const UserOrders = () => {

  const dispatch = useDispatch()
  const { userDashboard, user } = useSelector((state) => state.users);
  const { id } = useParams()

//para manejarnos entre los tabs
  const [toOrderDetail, setToOrderDetail] = useState(false);
  const [toReview, setToReview] = useState(false);

  //para manejar el input
  const [reviewInput, setReviewInput] = useState("");

console.log('esto es id', id)

 


  const captureUserName = userDashboard.name;


  //PARA NAVEGAR
  const toPurchaseDetails = (e) => {
    e.preventDefault();
    setToOrderDetail(true);
  };

  const toProductReview = (e) => {
    e.preventDefault();
    setToReview(true);
  };

  const backToOrderDetails = (e) => {
    e.preventDefault();
    setToReview(false);
  };

  const backToOrders = (e) => {
    e.preventDefault();
    setToOrderDetail(false);
  };
  //TERMINA PARA NAVEGAR

  const handlerInputReview = (e) => {
    setReviewInput({
      ...reviewInput,
      [e.target.inputReview]: e.target.value,
    });
  };


const paraMandarAlBack = (e) => {
  e.preventDefault();
  dispatch(postReview({
    _idProduct:paproba._id,
    _idUser:user,
    rating:3,
    description: Object.values(reviewInput).toString()
  }))
}
console.log('esto es y reviewInput en el comp', Object.values(reviewInput).toString())




//ESTRELLLLITASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS 


const [avgRating, setAvgRating] = useState(0);

const handleRating = (input) => {
  setAvgRating(input);
};







//aca estamos en las ordenes
  return toOrderDetail === false ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th key="thid">ID</th>
          <th key="thdate">date</th>
          <th key="thstatus">status</th>
          <th key="thcomprobante">ticket</th>
          <th key="thprice">price</th>
        </tr>
      </thead>
      <tbody>
        {product &&
          product.map((e) => (
            <tr>
              <td key="id">{e.id}</td>
              <td key="date">{e.date}</td>
              <td key="status">{e.status}</td>
              <td key="ticket">{e.ticket}</td>
              <td key="price">{e.price}</td>
              <Button onClick={(e) => toPurchaseDetails(e)}>detail</Button>
            </tr>
          ))}
      </tbody>
    </Table>
    //aca estamos en los productos de cada orden
  ) : toReview === false ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>name</th>
          <th>quantity</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        {
            <tr>
              <td>{paproba.name}</td>
              <td>{paproba.quantity}</td> {/*esto es del ticket */}
              <td>{paproba.price}</td>
              <Button onClick={(e) => toProductReview(e)}>
                make your review
              </Button>
            </tr>
          }
        <Button onClick={(e) => backToOrders(e)}>Back</Button>
      </tbody>
    </Table>
    //aca estamos en la review de cada producto de cada orden de compra
  ) : (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Make your review!</Modal.Title>
        </Modal.Header>

        {/* body pas cribi */}
        <Modal.Body>
          <>
            <FloatingLabel controlId="floatingTextarea" className="mb-3">
              {captureUserName}
            </FloatingLabel>


            <InputChangeRating rating={avgRating} handleRating={handleRating} />
            <StarsReview stars={avgRating} />

            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                name="reviewInput"
                onChange={(e) => handlerInputReview(e)}
              />
            </FloatingLabel>
          </>
        </Modal.Body>

        {/*final pas cribi */}

        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => backToOrderDetails(e)}>
            back
          </Button>
          <Button variant="primary" onClick={(e) => paraMandarAlBack(e)}>send review</Button>
          {/* <button type='submit' onSubmit={(e) => paraMandarAlBack(e)}>a ver</button> */}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default UserOrders;

// {
//   "_idProduct": "63972933f60a0fb9ec9dfe43",
//   "_idUser": "JNOwwnsTwYOT8iZHHjDRjxJ5NGv2",
//   "rating": 4,
//   "description": "Esto es una descripcion de ejemplo",
//   "_id": "63a1e60282b0ade5260462d4"
// }







































import React, { useState } from "react";

import { AiOutlineStar } from "react-icons/si";
import "../../styles/starsReview.css";

const StarsReview = ({ stars }) => {
  const maxStars = 5;

  // Obtenemos el valor completo
  const starPercentage = (stars / maxStars) * 100;

  // Redondeamos el resultado si es decimal
  const starPercentageRounded = Math.round(starPercentage);

  // Creamos el estilo para que las estrellas amarillas
  // se vean según el número que recibimos.
  const StarStyles = () => {
    return {
      width: starPercentageRounded + "%",
    };
  };

  return (
    <div className="stars-gray">
      <div className="stars-yellow" style={StarStyles()}></div>
    </div>
  );
};

export default StarsReview;











import React, { useState } from "react";

const InputChangeRating = (props) => {
  return (
    <input
      type="number"
      step="0.1"
      min="0"
      max="5"
      value={props.rating}
      onChange={(e) => {
        if (e.target.value > 5)
          return alert("Números del 0 al 5 contando decimales :)");
        return props.handleRating(e.target.value);
      }}
    />
  );
};

export default InputChangeRating;











import axios from 'axios';
import { reviewSlice } from './reviewsSlice';

export const postReview = (payload) => async (dispatch) => {
    try{
        const post = await axios.post(`http://localhost:3001/api/reviews/`, payload)
        console.log('esto es /reviewActions/postReview PAYLOAD', payload)
        console.log('esto es /reviewActions/postReview POST', post)

        // return dispatch(reviewSlice(post))
    }catch(error){
        return error
    }
};







import { createSlice } from "@reduxjs/toolkit";


export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        review: []
    },
    reducers:{
        postReview: (state, action) => {
            state.review = action.payload;
            console.log('esto es action', action.payload)
            console.log('esto es review', state.review)
        }
    }
})

export const {
    postReview,
} = reviewSlice.actions

export default reviewSlice.reducer



















export const product = [
    //cada una de estas compras va a tener uno a varios productos vendidos y
    {
      //dentro de cada una va a aparecer un purchasesMade=[]
      id: "12asd31asd23",
      date: "14/12/20",
      status: "COMPLETED",
      ticket: "HAND MADE",
      price: 89,
    },
    {
      id: "12asd31asd23",
      date: "14/13/20",
      status: "COMPLETED",
      ticket: "HAND MADE",
      price: 80,
    },
    {
      id: "12asd31asd23",
      date: "14/12/19",
      status: "COMPLETED",
      ticket: "HAND MADE",
      price: 189,
    },
    {
      id: "12asd31asd23",
      date: "14/12/22",
      status: "COMPLETED",
      ticket: "HAND MADE",
      price: 88,
    },
  ];
  
  export const purchasesMade = [
    //
  
    {
      name: "Nike Turbo 2.0",
      quantity: "1",
      price: "usd 900",
    },
    {
      name: "Nike Turbo 3.0",
      quantity: "33",
      price: "usd 1200",
    },
    {
      name: "Nike Turbo 4.0",
      quantity: "5",
      price: "usd 2200",
    },
    {
      name: "Nike Turbo 5.0",
      quantity: "10",
      price: "usd 3200",
    },
    {
      name: "Nike Turbo 10.0",
      quantity: "3",
      price: "usd 4200",
    },
  ];
  
  
  
  
  
  
  
  
  
  
  
  export const paproba = {
    "_id": "63972933f60a0fb9ec9dfe4e",
    "sales": 0,
    "name": "Air Jordan 12",
    "brand": "nike",
    "category": [
      "lifestyle"
    ],
    "collection": [
      "just-dropped",
      "just-dropped-1",
      "top-20-trending"
    ],
    "color": "Black/Metallic Gold-White",
    "gender": [
      "women"
    ],
    "card_picture": "https://image.goat.com/375/attachments/product_template_pictures/images/021/042/384/original/500924_00.png.png",
    "has_stock": 100,
    "detail_picture": "https://image.goat.com/750/attachments/product_template_pictures/images/021/042/384/original/500924_00.png.png",
    "original_picture": "https://image.goat.com/attachments/product_template_pictures/images/021/042/384/original/500924_00.png.png",
    "release_date": "2019-05-17",
    "price": 63,
    "rating": 4,
    "range": [
      10,
      10.5,
      11,
      11.5,
      12,
      12.5,
      13,
      13.5,
      14,
      14.5,
      15,
      15.5,
      16,
      16.5,
      17,
      17.5,
      18,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5
    ],
    "description": "<p>The Wmns Air Jordan 12 Retro &#39;Reptile&#39; sneaker draws details from the 1996 classic and elevates them with luxe style additions. This April 2019-released, women&#39;s-exclusive shoe features the AJ12’s original stitching, inspired by the Rising Sun Flag of Japan. Its black leather upper is laden with exotic reptile-inspired texture and embellished with gold accents. This edition is completed with classic Zoom cushioning and sections of herringbone tread.</p>\n",
    "stock": {
      "4": 8,
      "5": 35,
      "6": 33,
      "7": 34,
      "8": 7,
      "9": 35,
      "10": 25,
      "11": 3,
      "12": 9,
      "13": 34,
      "14": 1,
      "15": 9,
      "16": 48,
      "17": 2,
      "18": 26,
      "10.5": 33,
      "11.5": 23,
      "12.5": 15,
      "13.5": 6,
      "14.5": 36,
      "15.5": 47,
      "16.5": 37,
      "17.5": 27,
      "3.5": 48,
      "4.5": 18,
      "5.5": 14,
      "6.5": 0,
      "7.5": 37,
      "8.5": 2,
      "9.5": 18
    },
    "reviews": []
  }
















  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css");

.stars-gray {
    position: relative;
    display: inline-block;
}

.stars-yellow {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    width: 0;
}

.stars-gray::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #ccc;
  }
  
  .stars-yellow::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: #f8ce0b;
  }
  





















  import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/FormUser.css";
import Axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { getUserDashboards } from "../../redux/features/users/usersActions";
import { useParams } from "react-router-dom";

export default function FormUserUpdate () {
    const { _id } = useParams();
    const { userDashboard } = useSelector((state) => state.users);
    // States
    const [input, setInput] = useState({ name: '', email: '', phone: '', address: '', city: '', cp: '', state: '', country: '', image: '' });
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [file, setFile] = useState(null);

    //STRIPE y LOCALSTORAGE
    let productsCart = localStorage.getItem("carrito");

    const [products, setProducts] = useState(
        productsCart?.length > 1 ? JSON.parse(productsCart) : []
    );

    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    // Variables
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;    

    // Functions
    useEffect(() => {
        dispatch(getUserDashboards(_id));
        if (submit === true) {
            setTimeout(() => {
                setSubmit(false);
                document.getElementById("Form").reset();
            }, 5000);
        }
    }, [submit, user]);

    function validateInput (value, name) {
        const expression = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/        

        switch (name) {
            case 'name': return (!value || !expression.test(value)) ? setError({ ...error, name: 'It must set a valid name' }) : setError({ ...error, name: '' });            
            case 'phone': return (!value) ? setError({ ...error, phone: 'Please, provide a phone number' }) : setError({ ...error, phone: '' });
            case 'address': return (!value) ? setError({ ...error, address: 'Please, provide an address' }) : setError({ ...error, address: '' });
            case 'city': return (!value) ? setError({ ...error, city: 'Please provide a name of city' }) : setError({ ...error, city: '' });
            case 'cp': return (isNaN(parseInt(value))) ? setError({ ...error, cp: 'Please, provide a valid number of cp' }) : setError({ ...error, cp: '' });
            case 'state': return (!value) ? setError({ ...error, state: 'Please provide a name of State' }) : setError({ ...error, state: '' });
            case 'country': return (!value) ? setError({ ...error, country: 'Please, provide a name of country' }) : setError({ ...error, country: '' });
        }
    }

    async function handleImage (event) {
        setFile(event.target.files[0]);
        const data = new FormData();
        data.append("file", event.target.files[0]);
        data.append("upload_preset", UPLOAD_PRESET);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`, 
            { method: "POST", body: data });
        const info = await response.json();        
        setInput({ ...input, [event.target.name]: info.url });
    }

    function handleChange (event) {
        setInput({ ...input, [event.target.name]: event.target.value });        
        validateInput(event.target.value, event.target.name);        
    }

    async function handleSubmit (event) {
        if (user) {
            event.preventDefault();
            const response = await Axios.put(`http://localhost:3001/api/users/update/${user.uid}`, input);
            console.log(response);
            setSubmit(true);
            Axios
            .post("http://localhost:3001/api/checkouts", {
                products,
            })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
            setInput({});
        }
        else {
            navigate("/login");
        }
    }

    return(
        <div className = "container">
            <div className = "group">
                <form onSubmit = {handleSubmit} className = "form" id = "Form">
                    <label htmlFor = "email">Email: </label>
                    {user ? <input placeholder = {user.email} id = "email" type = "text" name = "email" value = {input.email} className = {error.email && "danger"} onChange = {handleChange} readOnly/> : null}

                    <label htmlFor = "name">Name: </label>
                    <input id = "name" type = "text" name = "name" value = {input.name} className = {error.name && "danger"} onChange = {handleChange}/>
                    {!error.name ? null : <p className = "danger">{error.name}</p>}

                    <label htmlFor = "phone">Phone: </label>
                    <input id = "phone" type = "text" name = "phone" value = {input.phone} className = {error.phone && "danger"} onChange = {handleChange}/>
                    {!error.phone ? null : <p className = "danger">{error.phone}</p>}

                    <label htmlFor = "address">Address: </label>
                    <input id = "address" type = "text" name = "address" value = {input.address} className = {error.address && "danger"} onChange = {handleChange}/>
                    {!error.address ? null : <p className = "danger">{error.address}</p>}

                    <label htmlFor = "city">City: </label>
                    <input id = "city" type = "text" name = "city" value = {input.city} className = {error.city && "danger"} onChange = {handleChange}/>
                    {!error.city ? null : <p className = "danger">{error.city}</p>}

                    <label htmlFor = "cp">CP: </label>
                    <input id = "cp" type = "text" name = "cp" value = {input.cp} className = {error.cp && "danger"} onChange = {handleChange}/>
                    {!error.cp ? null : <p className = "danger">{error.cp}</p>}

                    <label htmlFor = "state">State: </label>
                    <input id = "state" type = "text" name = "state" value = {input.state} className = {error.state && "danger"} onChange = {handleChange}/>
                    {!error.state ? null : <p className = "danger">{error.state}</p>}

                    <label htmlFor = "country">Country: </label>
                    <input id = "country" type = "text" name = "country" value = {input.country} className = {error.country && "danger"} onChange = {handleChange}/>
                    {!error.country ? null : <p className = "danger">{error.country}</p>}

                    <input type="file" onChange={handleImage} name = "image" />                    
                    { file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)} /> : null }

                    {/* Submit Button */}
                    <button type = "submit" value = "CREATE" onClick={handleSubmit} className = "button" disabled = {error.name || !input.name || error.phone || !input.phone || error.address || !input.address || error.city || !input.city || error.cp || !input.cp || error.state || !input.state || error.country || !input.country}>Send data</button>
                    {submit && <h2 className = "confirm">Data successfully set!</h2>}
                </form>
            </div>     
        </div>   
    )
}