import { actionTypes } from "../actions/actiontypes";


type Customerprops = {
    type:string,
    payload:any
}
const customerdetails = null;

 export const customerReducer:React.FC <Customerprops> = (state:any = customerdetails, {type, payload}) => {
    switch(type){
        case actionTypes.COSTUMER_DETAILS:
            return state = payload
        default:
            return state
    }
}   
