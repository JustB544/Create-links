import React, {useContext, useEffect, useState} from "react";
import { useLocalStorage } from "../helpers/hooks";
import Setting from "../Setting/Setting";
import CurrentSettingsContext from "../Context/CurrentSettingsContext";
import { obj } from "../helpers/interfaces";
import "./Settings.css";

function Settings({...props}){
    const {curSettings, setCurSettings} = useContext<obj>(CurrentSettingsContext);
    const [hidden, setHidden] = useState(true);
    let usedSettings : any;
    useEffect(() => {
        usedSettings = document.querySelector("#used-settings");
    });

    function toggleSettingsList(){
        setHidden(!hidden);
        usedSettings.classList.toggle("hidden");
    }
    return (
        <div className="Settings" {...props}>
            <div className="Settings_header">
                <h3>Set Settings</h3>
                <span onClick={toggleSettingsList}>{(hidden) ? "+" : "-"}</span>
            </div>
            <div id="used-settings" className="settings-list hidden">
                {(Object.keys(curSettings).length === 0) ? <p>No set settings</p> : ""}
                {Object.keys(curSettings).map(s => <Setting key={s} name={s} setting={curSettings[s]} mode="change"/>)}
            </div>
        </div>
        
    );
}

export default Settings;