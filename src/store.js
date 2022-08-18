import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './Redux/Counter/CounterSlice'
import UserAuthReducer from './Redux/UserAuthSlice/UserAuthSlice';
import { combineReducers } from "redux";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    counter: counterReducer,
    userAuth: UserAuthReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)