import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk"; 
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';
import bookReducer from './reducers/bookReducer';
import chatReducer from './reducers/chatReducer';
import payReducer from './reducers/payReducer';
import docReducer from './reducers/docReducer';
import forumReducer from './reducers/forumReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    book: bookReducer,
    chat: chatReducer,
    pay: payReducer,
    doc: docReducer,
    forum: forumReducer,
    notification: notificationReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));