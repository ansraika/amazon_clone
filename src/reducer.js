
export const initialState = {
    basket: [],
    user : []
};

//selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, element) => 
        amount = element.price + amount
    , 0); 

    

    
//reduce is a function that iterates over the array basket. 


//the type ADD_TO_BASKET is passed directly to the dispatch function in product.js
const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET': return{
            ...state,
            basket : [...state.basket,action.item]
        };

        case 'REMOVE_FROM_BASKET': 
            const index  = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                console.log("inside remove basket reducer")
                newBasket.splice(index, 1);
            } else {
                console.warn(`Cannot remove the product id:${action.id} `)
            }
            return{
                ...state,
                basket : newBasket
            }

        case 'SET_USER':return{
            ...state,
            user: action.user  //user passed by dispatch function in app.js while calling this action type
        }    

        case 'EMPTY_BASKET': return{
            ...state,
            basket : []
        }
        
        default:
            return state
    }
};

export default reducer;