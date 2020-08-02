import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartRecucer from './cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartRecucer
});