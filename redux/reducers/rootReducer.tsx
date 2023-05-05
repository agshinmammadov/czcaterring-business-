import { combineReducers } from "redux";
import {cartReducer} from '../reducers/cartReducer';
import {customerReducer} from '../reducers/customerReducer';
import { categoriesReducer } from "./categoriesReducer";


export const rootReducer = combineReducers({
    cartReducer,
    customerReducer,
    categoriesReducer
})
