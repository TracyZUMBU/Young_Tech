import React from 'react'

const TextError = (props) => {
    return (
        <div className="errorMessage">
            {props.children}
        </div>
    )
}

export default TextError
