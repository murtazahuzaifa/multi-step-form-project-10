import React, { FC, useState, useEffect } from 'react';
import { Form, Formik, FormikHelpers, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-material-ui';
import { Button, Radio, FormControlLabel, FormLabel, MenuItem, Menu, IconButton } from '@material-ui/core';
import { Phone } from '@material-ui/icons';
import * as Yup from 'yup';
import style from './style.module.css';
import { parsePhoneNumberFromString, parsePhoneNumber, CountryCode } from 'libphonenumber-js/mobile';
import { countries } from '../countries.json';
import { RootState } from '../store/rootReducer';
import { useSelector } from 'react-redux';
import { updateFields } from './formSlice';
import { useAppDispatch } from '../store/store';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { calculateAge } from '../utils';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers'; 
// import DateFnsUtils from '@date-io/date-fns';
// import Cleave from 'cleave.js/react';
// import "cleave.js/dist/addons/cleave-phone.ng";

export interface FormFields {
    dateOfBirth: Date | null;
    gender: 'male' | 'female' | '';
    mobileNo: string;
    city: string;
    address: string;
    country: string;
}
type CountryType = { name?: string, dial_code?: string, code?: CountryCode }

const formSchema = Yup.object<FormFields>({
    dateOfBirth: Yup.date().required('Your date of birth'),
    gender: Yup.mixed<'male' | 'female'>().required('Gender ?'),
    mobileNo: Yup.string().required('Mobile numeber ?'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Kindly place your address'),
    country: Yup.string().required('Your Country ?'),
})

////////////////////////////////////////////////////// COMPONENT /////////////////////////////////////////////////
const Form2: FC<{ handleNext: () => void, handleBack: () => void }> = ({ handleNext, handleBack }) => {

    const dispatch = useAppDispatch();
    const mobileNo = useSelector((state: RootState) => state.formField.mobileNo);
    const country = useSelector((state: RootState) => state.formField.country);
    // console.log(parsePhoneNumberFromString('336 0031756','PK')?.formatInternational());
    const [isSumit, SetSubmit] = useState<Boolean>(false);
    const [anchorCntryLst, setanchorCntryLst] = useState<null | HTMLElement>(null);
    const selectedCountry = {
        country: country,
        dial_code: `+${parsePhoneNumberFromString(mobileNo)?.countryCallingCode}`,
        code: parsePhoneNumberFromString(mobileNo)?.country,
    }
    const [selectedCntry, setSelectedCntry] = useState<CountryType>(selectedCountry) //(null)

    const formInitialValues: FormFields = {
        dateOfBirth: useSelector((state: RootState) => state.formField.dateOfBirth),
        gender: useSelector((state: RootState) => state.formField.gender),
        mobileNo: mobileNo,
        city: useSelector((state: RootState) => state.formField.city),
        address: useSelector((state: RootState) => state.formField.address),
        country: country,
    }

    const handleCntrySelect = (country: CountryType) => () => {
        setSelectedCntry(country);
        setanchorCntryLst(null);
    };

    const handleValidateForm = (values: FormFields) => {
        const error: { [P in keyof FormFields]?: string; } = {}
        //// checking and verifying user's mobile number according to the country code 
        if (values.mobileNo) {
            const isPhoneNumValid = parsePhoneNumberFromString(values.mobileNo, selectedCntry.code)?.isValid();
            if (!isPhoneNumValid) {
                error.mobileNo = 'Invalid mobile number'
            }
        }
        //// checking user age, it should be greater than 13 and lesser than 65
        const DOB = new Date(values.dateOfBirth || 'xxx');
        if (String(DOB) !== "Invalid Date" ) {
            const age = calculateAge(DOB);
            if (age < 12 && age !== 0) {
                error.dateOfBirth = 'Age should be greater than 12'
            } else if (age > 65 && age !== 0) {
                error.dateOfBirth = "Age should'nt greater than 65"
            }
        }else{
            error.dateOfBirth = "Your date of birth"
        }

        return error
    }

    const onSubmit = (values: FormFields, { setSubmitting }: FormikHelpers<FormFields>) => {
        // dispatch(updateFieldsAsync({ ...values, mobileNo: parsePhoneNumber(values.mobileNo, selectedCntry.code).formatInternational() }));
        dispatch(updateFields({ ...values, mobileNo: parsePhoneNumber(values.mobileNo, selectedCntry.code).formatInternational() }));
        setSubmitting(false);
        SetSubmit(true)
    }
    useEffect(() => {
        if (isSumit) handleNext()
    })

    /////////////////////////////////////////// RENDERing ////////////////////////////////////
    return (
        <Formik initialValues={formInitialValues} validationSchema={formSchema} onSubmit={onSubmit} validate={handleValidateForm} >
            {({ isValid, isSubmitting, values, handleChange }) => (
                <MuiPickersUtilsProvider utils={MomentUtils} >
                    <Form>
                        {/* <Cleave placeholder="Mobile.No" options={{phone: true, phoneRegionCode: 'NG', }}/> */}
                        <Field component={KeyboardDatePicker} label="Date of birth (DD/MM/yyyy)" format="DD/MM/yyyy" name='dateOfBirth' KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                        <br /> <br />
                        <div>
                            <FormLabel component="legend">Gender*</FormLabel>
                            <Field required component={RadioGroup} row type='radio' name='gender' value={values.gender} onChange={handleChange} children={
                                <>
                                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" labelPlacement="start" />
                                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" labelPlacement="start" />
                                </>
                            } />
                        </div> <br />

                        <div className={`${style.phoneNumCode}`}>
                            <div style={{ marginRight: '10px' }}>
                                <IconButton title='select country code' onClick={(e) => { setanchorCntryLst(e.currentTarget) }} >
                                    {selectedCntry.code ?
                                        <img width='30' height='25' src={`https://flagpedia.net/data/flags/w702/${selectedCntry.code.toLowerCase()}.webp`} alt="flag" /> :
                                        <Phone />}
                                </IconButton>

                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorCntryLst}
                                    keepMounted
                                    open={Boolean(anchorCntryLst)}
                                    onClose={() => { setanchorCntryLst(null); }}
                                    PaperProps={{ style: { maxHeight: 80 * 4.5, width: '55ch', }, }}
                                >
                                    {countries.map((option, idx) => (
                                        <MenuItem key={idx} onClick={handleCntrySelect(option as CountryType)} selected={selectedCntry.code === option.code}>
                                            <img width='30' style={{ marginRight: '10px' }}
                                                src={`https://disease.sh/assets/img/flags/${option.code.toLowerCase()}.png`} alt="flag"
                                            />
                                            {` (${option.dial_code}) ${option.name}`}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <div><Field required component={TextField} type='tel' disabled={!Boolean(selectedCntry.code)} name='mobileNo' label='Mobile.No' /></div>
                        </div>
                        <br />
                        <Field required component={TextField} type='text' name='city' label='City' /> <br /><br />
                        <Field required component={TextField} type='text' name='address' label='Address' /> <br /><br />
                        {/* <Field required component={TextField} type='text' name='country' label='Country' /> <br /><br /> */}
                        <div >
                            <Field required component={TextField} select type='select' name='country' label='Country' fullWidth children={
                                countries.map(({ name }, idx) => (
                                    <MenuItem key={idx} value={name} >{name}</MenuItem>
                                ))
                            } />
                        </div>
                        <br />
                        <div className={`${style.actionBtns}`} >
                            <div><Button onClick={handleBack} variant='contained' color='default' >Back</Button></div>
                            <div><Button type="submit" disabled={(!isValid || isSubmitting)} variant='contained' color='primary' >Next</Button></div>
                        </div>
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>
    );
}

export default Form2;
// https://disease.sh/assets/img/flags/pk.png
// https://flagpedia.net/data/flags/w702/pk.webp
// https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js