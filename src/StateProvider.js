import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
console.log('hey')
//StateProvider is called from index.js file
export const StateProvider = ({reducer,initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);