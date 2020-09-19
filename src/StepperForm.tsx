import React, { FC } from 'react';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';
import Form3 from './forms/Form3';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import {ThumbUp} from '@material-ui/icons';
import {resetFields} from './forms/formSlice';
import {useAppDispatch} from './store/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center'
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        stepper: {
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);
function getSteps() {
    return ['Personal details', 'Demographic details', 'Review details'];
}

const StepperForm:FC = () => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const dispatch = useAppDispatch()

    function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return <Form1 handleNext={handleNext} />
            case 1:
                return <Form2 handleNext={handleNext} handleBack={handleBack} />
            case 2:
                return <Form3 handleFinish={handleNext} handleBack={handleBack} />;
            default:
                return 'Unknown stepIndex';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        dispatch(resetFields())
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <div><h1>Multi-Step Form Demo</h1></div>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
                {steps.map((label, idx) => (
                    <Step key={idx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed  <ThumbUp/> </Typography>
                        <Button onClick={handleReset} variant='contained' >Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography component='div' className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default StepperForm;