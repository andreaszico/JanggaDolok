import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducer/loginReducer';
import articleReducer from '../reducer/articleReducer';
import commentReducer from '../reducer/commentReducer';
import loadingReducer from '../reducer/loadingReducer';
import reducer from '../reducer/index';

const rootReducer = combineReducers({
    user: userReducer,
    reducers: reducer,
    article: articleReducer,
    comment: commentReducer,
    loading: loadingReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
