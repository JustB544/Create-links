import React, { useContext, useState } from "react";
import { obj } from "../helpers/interfaces";
import { setPriority } from "../helpers/functions";
import { usePub } from "../helpers/pubsub";
import MainContext from "../Context/MainContext";
import "./Preset.css";

interface PresetProps {
    name: string;
    preset: any;
    [propName: string]: any;
}

function Preset({name, preset, ...props} : PresetProps){
    const {data: [data, setData], presets: [,setPresets], savedLinks: [,setSavedLinks], link: {fullLink: [,setFullLink]}} = useContext<obj>(MainContext);
    const [mode, setMode] = useState("list");
    const [value, setValue] = useState("");
    const publish = usePub();

    function usePreset(){
        setFullLink(preset.link);
        setData((d : obj ) => ({...preset.params, ...d}));
        setSavedLinks((sl : obj) => ({...sl, [name]: {link: preset.link, params: preset.params}}));
        setPriority(setData);
        setPriority(setSavedLinks);
        publish("usepreset");
    }

    function changeValue(e : any) : void {
        setValue(e.target.value);
    }

    function changePreset(){
        if (value !== "" && value !== name){
            setPresets((s : obj) => {
                let _s = {...s};
                delete _s[name];
                _s[value] = s[name];
                return _s;
            });
            setPriority(setPresets);
        }
        else if (value === "") {
            deletePreset();
        }
        setMode("list");
    }

    function editPreset(){
        setMode("change");
        setValue(name);
    }

    function deletePreset(){
        setPresets((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
    }

    return (
        <div className="row" style={{width: "100%"}} {...props}>
            {(mode === "list") ? 
            <>
                <div className="data-item vite-style" {...props} onDoubleClick={editPreset}>{name}</div>
                <button className="data-item data-button" {...props} onClick={usePreset}>Use</button>
            </> :
            <>
                <input className="data-item" autoFocus onBlur={changePreset} onChange={changeValue} value={value}></input>
                <button className="data-item data-button" onMouseDown={deletePreset}>Delete</button>
            </>}
        </div>
    );
}

export default Preset;