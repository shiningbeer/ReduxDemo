import { combineReducers } from 'redux';
import friendReducer from './friend';
import userReducer from './user';

export default rootReducer = combineReducers({
    friendState: friendReducer,
    userState:userReducer,
})