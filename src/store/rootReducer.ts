import {combineReducers} from '@reduxjs/toolkit';
import formReducer from '../forms/formSlice';

export const rootReducer = combineReducers({
    formField: formReducer,
});

export type RootState = ReturnType<typeof rootReducer> 
