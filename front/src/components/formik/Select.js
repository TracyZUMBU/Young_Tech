import React from 'react'
import { Field, ErrorMessage } from 'formik'
//components
import TextError from './TextError'


const Select = (props) => {
    const {label, name, options, ...rest} = props
    return (
        <div className="createAd-form__block">
            <label htmlFor={name}>{label}</label>
            <Field as="select" id={name} name={name} {...rest}>
                {     
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value} selected={option.selected} hidden={option.hidden} disabled={option.disabled}>
                                {option.key}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}

export default Select
