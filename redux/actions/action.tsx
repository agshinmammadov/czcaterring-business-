import { actionTypes } from "./actiontypes";

export const addToCart = (item:any) => {
    return{
        type: actionTypes.ADD_TO_CART,
        payload:item
    }
}

export const removeFromCart = (element:any) => {
    return{
        type:actionTypes.REMOVE_FROM_CART,
        payload:element
    }
}

export const importantCostumerDetails = (details:any) => {
    return {
        type:actionTypes.COSTUMER_DETAILS,
        payload:details
    }
}