import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Error = () => {
    const dispatch = useDispatch();
    const { errorMessage, showError } = useSelector((store) => store.error);

    useEffect(() => {
        setTimeout(() => {
            if (showError === true) {
                dispatch({type: "ERROR/HIDE_ERROR"});            
            }
        }, 3000);
    }, [dispatch, showError]);

    function hideError() {
        dispatch({type: "ERROR/HIDE_ERROR"});            
    }

    return (
        <div className="error-container" style={showError === true ? {transform: "translateX(0%)"} : {transform: "translateX(100%)"}}>
            <div className="close-icon-container" style={{width: "30px", height: "30px"}} onClick={hideError.bind(this)}>
                <svg fill="#fff" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
            </div>
            <h5>{errorMessage}</h5>
        </div>        
    );
};

export default Error;