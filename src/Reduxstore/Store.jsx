import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {persistStore} from 'redux-persist'
import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "@reduxjs/toolkit"
import  useReducer from './Slice/Userslice';
import PartnerReducer from './Slice/Partnerslice'
import AdminrRducer from './Slice/Adminslice'


const persistconfig= { key: 'root', storage, version: 1 };
const reducer = combineReducers({
    useReducer,
    PartnerReducer,
    AdminrRducer,
    
})
const persisteReducer=persistReducer(persistconfig,reducer)
const store=configureStore({
    reducer:persisteReducer
})
const persistor=persistStore(store)

export {store,persistor};
