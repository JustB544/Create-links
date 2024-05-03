import React from "react";
import { useLocalStorage } from "./hooks";
import Preset from "./Preset";
import './Presets.css';

function Presets({...props}){
    const [presets, setPresets] = useLocalStorage("cf-presets", true, () => ({"web-dev": {}}));
    return (
        <div id="presets" {...props}>
            <h3>Presets</h3>
            {Object.keys(presets).map(p => <Preset name={p} preset={presets[p]}/>)}
        </div>
    );
}

export default Presets;