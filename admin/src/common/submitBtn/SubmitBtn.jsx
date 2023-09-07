import React from 'react'
import './submitBtn.scss';

const SubmitBtn = ({submit, title, type}) => {
    return (
        <div 
            className="submitBtn" 
            style={{
                display: "flex",
                justifyContent: type
            }}
            onClick={submit}
        >
            <button> {title} </button>
        </div>
    )
}

export default SubmitBtn;