import * as TYPES from './types';

export function addFriend(new_friend) {
    return {
        'type': TYPES.FRIEND_ADD,
        'new_friend': new_friend,
    }
}

export function delFriend(friend_name) {
    return {
        'type': TYPES.FRIEND_DEL,
        'friend_name': friend_name,
    }
}