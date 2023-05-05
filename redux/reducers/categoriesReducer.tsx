import { actionTypes } from "../actions/actiontypes";


type CategoryProps = {
    type:string,
    payload:any
}
const showCategory = false;

 export const categoriesReducer:React.FC <CategoryProps> = (state:any = showCategory, {type, payload}) => {
    switch(type){
        case actionTypes.MEAL_CATEGORIES:
            return state = payload
        default:
            return state
    }
}   
