import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import './Payment.css'
import CheckoutProduct from './CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios';
import { Link,useHistory } from 'react-router-dom'
import { db } from './firebase'

function Payment() {
  const[{basket,user},dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError] = useState(null)
  const [disabled,setDisabled] = useState(true)
  const [succeeded,setSucceeded] = useState(false)
  const [processing,setProcessing] = useState("")
  const [clientSecret,setClientSecret] = useState(true)

  const history = useHistory();
  //use effect when the basket changes, so whenever the basket changes it will update the  stripe secret that will help to charge correct amount
  useEffect(() =>{
    //generate the stripe secret which allows use to charge the customer
    const getClientSecret = async () =>{
        const response = await axios({
            method:'post',
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            // /payments/create is the post method in functions-> index.js
        });
        setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  },[basket])

  console.log('the client secret : ', clientSecret)
  console.log("User:",user)
  const handleSubmit = async (e) =>{
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method : {
                card : elements.getElement(CardElement)
            }
        }).then( ({ paymentIntent }) => {
            //paymentIntent = payment confirmation
            // This will populate the firestore
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created : paymentIntent.created   //this gives the timestamp of when the order was created
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type : 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    
  }

  const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
  }

  return (
        <div className='payment'>
            <div className='payment_header'>
              <b> {!basket.length? 'No items in the basket': 'Checkout with '+ basket.length + ' item'} </b> 
            </div>
            <div className='payment_section'>
                    <div className='payment_reviewitems'>
                        <h3> {!basket.length? '' : 'Review Items'} </h3>
                        {basket.map(item=>(
                            <CheckoutProduct
                                id = {item.id}
                                image = {item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
            </div>
            <div className='payment_section'>
                <div className='payment_title'>
                        <h3>Delivery Address:</h3> 
                        <p>{user?.email}</p>
                        <p>Bandra, Mumbai</p>
                        <p>Maharashtra, India</p>
                </div>
            </div>    
            <div className='payment_section'>
                <div className='payment_method'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment_details'>
                    <form onSubmit={handleSubmit}> 
                        <br/>
                        <CardElement onChange={handleChange}/>
                        <br/>
                        <div className='payment_priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <p>
                                            Subtotal ({basket.length} item) : <strong>{value}</strong>
                                        </p>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"INR"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            {/* If there is an error then display it in the below div */}
                            {error && <div>{error}</div>} 
                        </div>
                    </form>
                </div>
            </div>     

        </div>
     )
}

export default Payment;
