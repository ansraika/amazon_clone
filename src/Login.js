import React, { useState } from 'react';
import './Login.css'
import {Link,useHistory} from "react-router-dom";
import {auth} from './firebase'

function Login() {
  const history = useHistory(); //use history allows to change the url
  const[email,setEmail] = useState('');  
  const[password,setPassword] = useState('');  

  const signIn = e =>{
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email,password)
            .then((auth) => {
                if(auth){
                    history.push('/')
                }
            })
            .catch(error =>{
                alert(error.message)
            })
  }
 
  const signUp = e =>{
      e.preventDefault();
      auth
            .createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                //createUserWithEmailAndPassword will create a new user with provided email and password. 
                //If successful it will return an object named auth. 
                console.log(auth);
                //if auth is not empty then route to the home page
                if(auth){
                    history.push('/')
                }
            })
            .catch(error => {
                alert(error.message)
            })
  }

  return (
      <div className='login'>
          <Link to="/">
            <img 
                src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
                className='login_logo'/>
          </Link>

        <div className='login_container'>
            <h1>Sign In</h1>
            <form>
                <h5>Email</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                <button type='submit' onClick={signIn} className='login_signin'>
                    Sign In
                </button>
            </form>
            <p>By Signing In you'll be taken back to the retail page of this <b>CLONE Practice Website</b>This is a clone website
            and orders are not placed using this website. This website is purely build for educational and practice purpose.
            </p>
            <button type='submit' onClick={signUp} className='login_signup'>Create you Amazon CLONE Account</button>
        </div>

      </div>
      
  )
}

export default Login;
