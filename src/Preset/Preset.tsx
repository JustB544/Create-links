import React, { useContext } from "react";
import { obj } from "../helpers/interfaces";
import { setPriority } from "../helpers/functions";
import MainContext from "../Context/MainContext";

interface PresetProps {
    name: string;
    preset: any;
    [propName: string]: any;
}

function Preset({name, preset, ...props} : PresetProps){
    const {data: [data, setData], curData, savedLinks: [,setSavedLinks], link: {fullLink: [,setFullLink]}} = useContext<obj>(MainContext);

    function usePreset(){
        setFullLink(preset.link);
        setData((d : obj ) => ({...preset.params, ...d}));
        setSavedLinks((sl : obj) => ({...sl, [name]: {link: preset.link, params: preset.params}}));
        setPriority(setData);
        setPriority(setSavedLinks);
    }

    return (
        <button className="preset" {...props} onClick={usePreset}>{name}</button>
    );
}

export default Preset;