import React, {useState} from "react";
import "./LinkActions.css";
import Autofill from "../Autofill/Autofill";
import RestrictAutofill from "../RestrictAutofill/RestrictAutofill";
import { useLocalStorage } from "../helpers/hooks";

function LinkActions({...props}){
    const [restrict, setRestrict] = useLocalStorage("cf-restrict", true, () => false);
    return (
        <div className="LinkActions" {...props}>
            <Autofill restrict={restrict}/>
            <RestrictAutofill restrict={restrict} setRestrict={setRestrict}/>
        </div>
    );
}

export default LinkActions;