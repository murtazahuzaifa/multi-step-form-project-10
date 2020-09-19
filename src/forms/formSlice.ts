import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FormFields as Form1Fields} from './Form1';
import {FormFields as Form2Fields} from './Form2';
import {Merge} from '../utils';

type StateType = Merge<Form1Fields, Form2Fields>

// const sliceState:StateType = {
//     userName: 'murtaza',
//     password: '12345678',
//     confirmPassword: '12345678',
//     email: '',
//     dateOfBirth: null,
//     gender: 'male',
//     mobileNo: '+923360000000',
//     address: '5adsdasdasdasdsafsf',
//     city: 'karachi',
//     country: 'Pakistan',
// }
const sliceState:StateType = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    dateOfBirth: null,
    gender: '',
    mobileNo: '',
    address: '',
    city: '',
    country: '',
}

// export const updateFieldsAsync = createAsyncThunk(
//     'form/fields',
//   async (data, thunkAPI) => {
//       console.log(data);
//     // const response = await userAPI.fetchById(userId)
//     return 'this is a data'
//   }
//   )

const slice = createSlice({
    name: 'formSlice',
    initialState: sliceState,
    reducers: {
        updateFields: (state, {payload}: PayloadAction<Partial<StateType>>)=>{
            return {...state, ...payload}
        },
        resetFields: ()=>{
            return sliceState;
        },
    },
})

export const {updateFields, resetFields} = slice.actions;

// export const updateFieldsAsync = (formFields:Partial<StateType>) => (dispatch:any) => {
//     setTimeout(() => {
//       dispatch(updateFields(formFields));
//     }, 1000);
//   };

export default slice.reducer;