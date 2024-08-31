import React from "react";
import "./RestrictAutofill.css";

interface RestrictAutofillProps {
    restrict: boolean;
    setRestrict: Function;
    [propName: string]: any;
}

function RestrictAutofill({restrict, setRestrict, ...props} : RestrictAutofillProps){
    return (
        <button className="RestrictAutofill" {...props} onClick={() => setRestrict((r : boolean) => !r)}>{(restrict) ? "Unrestrict" : "Restrict"}</button>
    );
}

export default RestrictAutofill;