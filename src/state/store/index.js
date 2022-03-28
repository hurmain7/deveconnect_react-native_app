import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import  thunkMiddleware  from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers";
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';


const middlewares = [
    thunkMiddleware,
];
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'Auth'
    ],
    blacklist: [
        'auth'
    ]
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    // rootReducer,w
    persistedReducer,
    {},
    compose(
        composeWithDevTools(applyMiddleware(...middlewares))
    )
);

export default () => {
    const persistor = persistStore(store, null);
    return { store, persistor};
};