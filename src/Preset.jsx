import React from "react";
import { useLocalStorage } from "./hooks";

function Preset({name, preset}){
    return (
        <button className="preset">{name}</button>
    );
}

export default Preset;