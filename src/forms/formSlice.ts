import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FormFields as Form1Fields} from './Form1';
import {FormFields as Form2Fields} from './Form2';
import {Merge} from '../utils';

type StateType = Merge<Form1Fields, Form2Fields>

const sliceState:StateType = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    age: 0,
    gender: '',
    mobileNo: '',
    address: '',
    city: '',
    country: '',
}

const slice = createSlice({
    name: 'formSlice',
    initialState: sliceState,
    reducers: {
        updateFields: (state, {payload}: PayloadAction<Partial<StateType>>)=>{
            return {...state, ...payload}
        },
        resetFields: ()=>{
            return sliceState;
        } 
    }
})

export const {updateFields, resetFields} = slice.actions;

export default slice.reducer;