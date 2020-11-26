import React from "react";

const Button = ({ value, className, action, messageError, ...rest }) => {
  return(
    <>
    <p className="errorMessage">{messageError}</p>
    <button onClick={action} className={className} {...rest}>{value}</button>
    </>
    
  )
};

export default Button;
