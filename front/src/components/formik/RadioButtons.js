import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="radioButton">
      <label className="createAd-form__block">{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div key={option.key} className="container-radioOptions" >
                
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                  className="radio"
                />
                <label htmlFor={option.value}>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} className="errorMessage"/>
    </div>
  );
};

export default RadioButtons;
