import React, {useContext, useEffect, useState} from "react";
import Setting from "./Setting";
import CurrentSettingsContext from "./CurrentSettingsContext";
import "./Settings.css";

function settingsList(){
    const {settings, setSettings} = useContext(CurrentSettingsContext);
    let settingsList;
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        settingsList = document.querySelector("#saved-settings");
    });

    function toggleSettingsList(){
        setHidden(!hidden);
        settingsList.classList.toggle("hidden");
    }
    return (
        <div className="Settings">
            <div className="Settings_header">
                <h3>Settings</h3>
                <span onClick={toggleSettingsList}>{(hidden) ? "+" : "-"}</span>
            </div>
            <div id="saved-settings" className="settings-list hidden">
                {Object.keys(settings).map(s => <Setting key={s} name={s} setting={settings[s]} mode="list"/>)}
                <Setting mode="add"/>
            </div>
        </div>
        
    );
}

export default settingsList;