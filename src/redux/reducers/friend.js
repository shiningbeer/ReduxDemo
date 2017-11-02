import * as TYPES from '../actions/types';

const initialState = {
    friend_list:[]       
};

export default function friendReducer(state = initialState, action) {

    switch (action.type) {
        case TYPES.FRIEND_ADD:
            
            var newlist=state.friend_list
            newlist.push(action.new_friend);
            console.log(newlist)
            return {
                friend_list:newlist
            };
            break;

        case TYPES.FRIEND_DEL:
            var index=-1;
            for(i=0;i<state.friend_list.length;i++){
                if(state.friend_list[i].name==action.friend_name){
                    index=i;
                    break;
                }
            }
            if(index==-1)
                return state;
            var newlist=state.friend_list
            newlist.splice(index,1)
            return {
                friend_list:newlist
            };
            break;
        default:
            return state;
    }
}