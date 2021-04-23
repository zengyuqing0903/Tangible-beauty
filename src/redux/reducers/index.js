import { combineReducers } from 'redux';
import token from './token';
import users from './users';



const oneApp = combineReducers({
    token,
    users
    
});

export default oneApp;