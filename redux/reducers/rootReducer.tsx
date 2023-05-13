import { combineReducers } from "redux";
import {cartReducer} from '../reducers/cartReducer';
import {customerReducer} from '../reducers/customerReducer';

export const rootReducer = combineReducers({
    cartReducer,
    customerReducer
})