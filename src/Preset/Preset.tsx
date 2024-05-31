import React, { useContext } from "react";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";

interface PresetProps {
    name: string;
    preset: any;
    [propName: string]: any;
}

function Preset({name, preset, ...props} : PresetProps){
    const {setCurData, setData, setSavedLinks, setFullLink, setPriority} = useContext<obj>(MainContext);

    function usePreset(){
        setFullLink(preset.link);
        setCurData((cd : obj ) => ({...cd, ...preset.params}));
        setData((d : obj) => {
            const params : obj = {};
            Object.keys(d).forEach(k => params[k] = {nickname: d[k].nickname});
            return {...d, params};
        });
        setSavedLinks((sl : obj) => ({...sl, [name]: {link: preset.link, params: preset.params}}));
        setPriority("data");
        setPriority("curData");
        setPriority("savedLinks");
    }

    return (
        <button className="preset" {...props} onClick={usePreset}>{name}</button>
    );
}

export default Preset;