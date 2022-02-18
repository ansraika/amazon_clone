/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

//type for action
const ADD_TO_BASKET = 'ADD_TO_BASKET'

//action defination
// export  const addToBasketAction = (item) =>{
//     return{
//         type:ADD_TO_BASKET,
//         item : item
//     }
// }

function Product({id,title,image,price,rating}) {
   //we have defined the redux action inside the dispatch function. 
    const [{basket},dispatch] = useStateValue(); //{basket} is nothing but : state.basket i.e state -> basket , you can also write[state,dispatch]
    const product_rating = rating[0]
    const product_price = price[0]
    console.log("Price:",product_price)
    console.log("BAsket is herE:",basket)
    
    // const addToBasket2 = () =>{
    //     dispatch(addToBasketAction({
    //         item : {
    //              id : id,
    //              title : title,
    //              image : image,
    //              price : price,
    //              rating : rating
    //         }
    //     }));
    // }
    const addToBasket = () =>{
        dispatch({
            type : ADD_TO_BASKET,
            item : {
                 id : id,
                 title : title,
                 image : image,
                 price : product_price,
                 rating : product_rating
            }
        });
    }
    return (
        <div className='product'>
            <div className='product_info'>
                <p>{title}</p>
                <p className='product_price'>
                    <small>INR</small>
                    <strong>{product_price}</strong>
                </p>
                <div className='product_rating'>
                    {
                    Array(product_rating)
                        .fill()
                        .map((_,i) => (
                            <p>★</p>
                        ))
                    }
                    
                </div>
            </div>
            <img src={image}/>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
