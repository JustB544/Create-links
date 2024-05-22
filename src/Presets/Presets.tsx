import React from "react";
import { useLocalStorage } from "../helpers/hooks";
import { obj } from "../helpers/interfaces";
import Preset from "../Preset/Preset";
import './Presets.css';

function Presets({...props}){
    const [presets, setPresets] = useLocalStorage("cl-presets", true, () => ({"web-dev": {}}));
    return (
        <div id="presets" {...props}>
            <h3>Presets</h3>
            {Object.keys(presets).map((p) => <Preset key={p} name={p} preset={presets[p]}/>)}
        </div>
    );
}

export default Presets;