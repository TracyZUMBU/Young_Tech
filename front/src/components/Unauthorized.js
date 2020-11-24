import React from "react";
import { useHistory } from "react-router-dom";

const Unauthorized = () => {
  let history = useHistory();
  console.log("I'm in unauthorized page");
  return (
    <div className="unauthorized">
      <div className="unauthorized__content">
        <p className="unauthorized__link" onClick={() => history.goBack()}>
          <span className="unauthorized__logo">&#10558;</span>Rebrousser chemin
        </p>
      </div>
    </div>
  );
};
export default Unauthorized;
