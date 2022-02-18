/* eslint-disable no-empty-pattern */
import React, {useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'
import Inventory from "./Inventory";
import CloneHeader from "./CloneHeader";

const promise = loadStripe("pk_test_51KOPuvSFGWpHbs7C8iwQK5zKnXuySfbIxr5tFSLzOXTOkdS1IG77jhtF9RwhBE0WWoEZOiCBxuZ0Trsc3fxTEDx800WyWNdY3X");

function App() {

  const[{},dispatch] = useStateValue();

  useEffect(() => {
      auth.onAuthStateChanged(authUser => {
        console.log('The user:',authUser);
     
        if(authUser){
          //user is logged in 
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        }
        else{
          //user is logged out
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
      })
  },[])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login'>
           <Login/>
          </Route>
          <Route path='/orders'>
            <Header/>
            <Orders/>
            <CloneHeader/>
          </Route>
          <Route path='/checkout'>
            <Header/>
            <Checkout/>
            <CloneHeader/>
          </Route>
          <Route path='/payment'>
            <Header/>  
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
            <CloneHeader/>
          </Route>
          <Route path='/'>
            <Header/>
            <Inventory/>
            <CloneHeader/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
