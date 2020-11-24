import React from 'react'
import { Field, ErrorMessage } from 'formik'
//components
import TextError from './TextError'


const Input = (props) => {
    const {label, name, ...rest} = props
  
    return (
        <div className="createAd-form__block">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest}/>
            <output id="output"></output>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Input
