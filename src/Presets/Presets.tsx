import React, {useContext} from "react";
import { useLocalStorage } from "../helpers/hooks";
import { obj } from "../helpers/interfaces";
import Preset from "../Preset/Preset";
import './Presets.css';
import MainContext from "../Context/MainContext";

function Presets({...props}){
    const {presets, setPresets} = useContext<obj>(MainContext)
    return (
        <div id="presets" {...props}>
            <h3>Presets</h3>
            {Object.keys(presets).map((p) => <Preset key={p} name={p} preset={presets[p]}/>)}
        </div>
    );
}

export default Presets;