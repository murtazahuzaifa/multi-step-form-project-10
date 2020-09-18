import React, { useState } from 'react';
import Form1 from './forms/Form1';
import Form2 from './forms/Form2';
import Form3 from './forms/Form3';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);
function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

const StepperForm = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    // activeStep.has(0);

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
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, idx) => (
                    <Step key={idx}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
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