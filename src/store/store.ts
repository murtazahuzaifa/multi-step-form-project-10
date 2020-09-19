import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {useDispatch} from 'react-redux';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({serializableCheck: false}),
})



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = ()=> useDispatch<AppDispatch>()
