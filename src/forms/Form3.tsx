import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

const Form3: FC<{ handleFinish: () => void, handleBack: () => void }> = ({ handleFinish, handleBack }) => {
    const [isSumit, SetSubmit] = useState<Boolean>(false);

    const onFinish = () => {
        SetSubmit(true);
    }

    useEffect(() => {
        if (isSumit) handleFinish()
    })

    return (
        <div>
            'This is the bit I really care about!'
            <div>
                <Button variant='contained' color='default' onClick={handleBack} >Back</Button>
                <Button variant='contained' color='primary' onClick={onFinish} >Finish</Button>
            </div>
        </div>
    )
}

export default Form3;