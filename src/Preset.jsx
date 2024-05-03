import React from "react";
import { useLocalStorage } from "./hooks";

function Preset({name, preset, ...props}){
    return (
        <button className="preset" {...props}>{name}</button>
    );
}

export default Preset;