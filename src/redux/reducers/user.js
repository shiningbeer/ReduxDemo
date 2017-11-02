import * as TYPES from '../actions/types';

    const initialState = {
    	someone_login: false,
    	login_user:null,          //初始无人登录
    };
    
    export default function userReducer(state = initialState, action) {
    
    	switch (action.type) {
    		case TYPES.USER_LOGIN:
    			return {
    				someone_login: true,
    	            login_user:action.user,  //返回新状态：有人登录，登录者为action携带的user属性
    			};
    			break;
    
    		case TYPES.USER_LOGOUT:
    			return {
    				someone_login: false,
    	            login_user:null,  //返回新状态，无人登录
    			};
    			break;
    		default:
    			return state;
    	}
    }