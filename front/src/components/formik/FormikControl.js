import React from "react";
import DatePicker from "./DatePicker";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import Select from "./Select";
import Textarea from "./Textarea";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select": 
    return <Select {...rest} />
    case "radio":
    case "checkbox": 
    return <RadioButtons {...rest} />
    case "date": 
    return <DatePicker {...rest} />
    default:
      return null;
  }
};

export default FormikControl;
