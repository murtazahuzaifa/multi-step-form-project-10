import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { RootState } from '../store/rootReducer';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import style from './style.module.css';
import { useSelector } from 'react-redux';

const Form3: FC<{ handleFinish: () => void, handleBack: () => void }> = ({ handleFinish, handleBack }) => {
    const [isSumit, SetSubmit] = useState<Boolean>(false);
    const {userName, password, email, dateOfBirth, gender, mobileNo, country, city, address} = useSelector((state: RootState) => state.formField)
    const [isPasswordVisible, SetPasswordVisible] = useState<boolean>(false);
    const handleClickPassword = () => { SetPasswordVisible(!isPasswordVisible) }
    const onFinish = () => {
        SetSubmit(true);
    }

    useEffect(() => {
        if (isSumit) handleFinish()
    })
    return (
        <div className={`${style.form3}`} >
            <div>
                <div>Username: <span>{userName}.</span></div>
                <div>Password:
                    <span className={`${isPasswordVisible ? style.normalText : style.passwordText}`} >{password}</span>
                    {isPasswordVisible ? <span onClick={handleClickPassword}><Visibility /></span> : <span onClick={handleClickPassword}><VisibilityOff /></span>}
                </div>
                <div>Email: <span>{email || "No email"}.</span></div>
                <div>Date of Birth: <span>{new Date(dateOfBirth|| 'xxx').toDateString()}.</span></div>
                <div>Gender: <span>{gender}.</span></div>
                <div>Mobile.No: <span>{mobileNo}.</span></div>
                <div>Address: <span>{address}.</span></div>
                <div>City: <span>{city}.</span></div>
                <div>Country: <span>{country}.</span></div>
            </div>
            <div className={`${style.actionBtns}`} >
                <div><Button variant='contained' color='default' onClick={handleBack} >Back</Button></div>
                <div><Button variant='contained' color='primary' onClick={onFinish} >Finish</Button></div>
            </div>
        </div>
    )
}

export default Form3;

// {
//     Object.entries(formFields).map(([key,value], idx) => {
//         return <div key={idx}>{key}: <span>{value as string}</span> </div>
//     })
// }