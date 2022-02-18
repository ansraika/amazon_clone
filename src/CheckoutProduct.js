/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hidebutton}) {
    const [{basket},dispatch] = useStateValue();
    const removeFromBasket = () =>{
        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id : id,
        });
    }
    
  return( 
    <div className='checkoutProduct'>
        <img className='checkoutProduct_image' src = {image}/>
        <div className='checkoutProduct_info'>
            <p className='checkoutProduct_title'>{title}</p>
            <p className='checkoutProduct_price'>
                <small>INR</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct_rating'>
                {
                    Array(rating)
                        .fill()
                        .map((_,i) => (
                            <p>★</p>
                        ))
                }
            </div>
            {/* if the hidebuttom params is not passed then show the button */}
            {!hidebutton && (
                <button onClick={removeFromBasket}>Remove from basket</button>
            )}
            
        </div>
    </div>
  )
}

export default CheckoutProduct;
