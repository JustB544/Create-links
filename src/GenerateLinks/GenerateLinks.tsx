import React from "react";
import { useLocalStorage } from "../helpers/hooks";

function GenerateLinks({...props}){
    return (
        <button {...props}>Generate</button>
    );
}

export default GenerateLinks;