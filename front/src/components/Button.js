import React from "react";

const Button = ({ value, className, action, ...rest }) => {
  return <button onClick={action} className={className} {...rest}>{value}</button>;
};

export default Button;
