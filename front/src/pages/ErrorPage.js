import React from 'react'
import { useHistory } from 'react-router-dom'


 const ErrorPage = () => {
     let history = useHistory()
    return (
        <div className="errorPage">
        <div className="errorPage__content">
          <p className="errorPage__link" onClick={() => history.goBack()}>
            {" "}
            <span className="errorPage__logo">&#10558;</span>Rebrousser chemin
          </p>
        </div>
      </div>
    )
}

export default ErrorPage