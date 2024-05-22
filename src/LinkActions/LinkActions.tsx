import React from "react";
import "./LinkActions.css";
import Autofill from "../Autofill/Autofill";

function LinkActions({...props}){
    return (
        <div className="LinkActions" {...props}>
            <Autofill />
        </div>
    );
}

export default LinkActions;