import * as TYPES from './types';
export function loginUser(user) {
    return {
        'type': TYPES.USER_LOGIN,
        'user': user,
    }
}

export function logoutUser() {
    return {
        'type': TYPES.USER_LOGOUT,
    }
}