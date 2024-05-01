import React from "react";
import { useLocalStorage } from "./hooks";

function Settings(){
    const [settings, setSettings] = useLocalStorage("cf-settings", true, () => ({}))
    return (
        <button className="preset">{name}</button>
    );
}

export default Settings;