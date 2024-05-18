import React from "react";
import { useLocalStorage } from "../helpers/hooks";

interface PresetProps {
    name: string;
    preset: any;
    [propName: string]: any;
}

function Preset({name, preset, ...props} : PresetProps){
    return (
        <button className="preset" {...props}>{name}</button>
    );
}

export default Preset;