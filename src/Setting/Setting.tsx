import React, {useContext, useState} from "react";
import CurrentSettingsContext from "../Context/CurrentSettingsContext";
import { obj } from "../helpers/interfaces";
import "./Setting.css";

interface SettingProps {
    name: string;
    setting: any;
    mode: string;
    [propName: string]: any;

}

function Setting({name, setting, mode, ...props} : SettingProps){
    const {settings, setSettings, curSettings, setCurSettings} = useContext<obj>(CurrentSettingsContext);
    const [_mode, setMode] = useState(mode);
    const [value, setValue] = useState("");

    function addToSettings(){
        setSettings({...settings, [value]: {}});
        setValue("");
    }

    function editSetting(){
        setMode("add");
        setValue(name);
    }

    function changeSetting(){
        setSettings((s : obj) => {
            let _s = {...s};
            delete _s[name]
            _s[value] = s[name];
            return _s;
        });
        // setCurSettings((s) => {
        //     let _s = {...s};
        //     delete _s[name]
        //     _s[value] = s[name];
        //     return _s;
        // });
        setMode("list");
    }

    function deleteCurSetting(){
        setCurSettings((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
    }

    function changeValue(e : any){
        setValue(e.target.value);
    }

    function addCurSetting(){
        setCurSettings({...curSettings, [name]: {}});
    }

    function deleteSetting(){
        setSettings((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
        setCurSettings((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
    }

    return (
        <div className="row" style={{width: "100%"}} {...props}>
            {(_mode === "change") ?
            <>
                <button className="setting-item" onClick={() => {setMode("add")}}>{name}</button>
                <input className="setting-item" onChange={changeValue} value={value}></input>
            </> : 
            (_mode === "list") ? 
            <>
                <div className="setting-item vite-style" onDoubleClick={editSetting}>{name}</div>
                <button className="setting-item" onClick={addCurSetting}>Add</button>
            </> :
            // All options past here have _mode === "add"
            (mode === "list") ?
            <>
                <input className="setting-item" autoFocus onBlur={changeSetting} onChange={changeValue} value={value}></input>
                <button className="setting-item" onMouseDown={deleteSetting}>Delete</button>
            </> : 
            (mode === "change") ? 
            <>
                <div className="setting-item vite-style" onClick={() => {setMode("change")}}>{name}</div>
                <button className="setting-item" onClick={deleteCurSetting}>Delete</button>
            </> : 
            <>
                <input className="setting-item" onChange={changeValue} value={value}></input>
                <button className="setting-item" onClick={addToSettings}>Create</button>
            </>}
        </div>
    );
}

export default Setting;