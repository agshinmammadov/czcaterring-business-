import { actionTypes } from "../actions/actiontypes";


type Cartprops = {
    type:string,
    payload:any
}
const cart = null;

 export const cartReducer:React.FC <Cartprops> = (state:any = cart, {type, payload}) => {
    switch(type){
        case actionTypes.ADD_TO_CART:
            if(state === null){
                return state = [payload]
            }else{
             return  [...state, payload]
            }
        case actionTypes.REMOVE_FROM_CART:
            return state.filter((meal:any) => meal.selectedMeal.id !== payload)
        default:
            return state
    }
}   
