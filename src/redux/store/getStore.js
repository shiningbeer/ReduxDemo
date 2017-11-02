import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';

let store = createStore(rootReducer);
export const configureStore = () => {
    return store;
}