import React from "react";
import { useLocalStorage } from "./hooks";
import Preset from "./Preset";
import './Presets.css';

function Presets(){
    const [presets, setPresets] = useLocalStorage("cf-presets", true, () => ({"web-dev": {}}));
    return (
        <div id="presets">
            <h3>Presets</h3>
            {Object.keys(presets).map(p => <Preset name={p} preset={presets[p]}/>)}
        </div>
    );
}

export default Presets;