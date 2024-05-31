import React, {useState, useContext} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Link.css";

interface LinkProps {
    name: string;
    [propName: string]: any;
}

function Link({name, ...props} : LinkProps){
    const {presets, setPresets, savedLinks, setSavedLinks, setPriority} = useContext<obj>(MainContext);

    const [mode, setMode] = useState("list");
    const [value, setValue] = useState("");

    function editLink(){
        setMode("change");
        setValue(name);
    }

    function useLink(){
        //TODO: Implement useLink
    }

    function copyLink(){
        navigator.clipboard.writeText(savedLinks[name].link);
        (document.querySelector("#link-"+name+" input.link-item") as any).focus();
    }

    function changeValue(e : any){
        setValue(e.target.value);
    }

    function deleteLink(){
        setSavedLinks((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
        setPriority("savedLinks");
    }

    function changeLink(){
        if (value !== "" && value !== "?" && value !== name){
            setSavedLinks((s : obj) => {
                let _s = {...s};
                _s[value] = s[name];
                delete _s[name];
                return _s;
            });
            setPriority("savedLinks");
        }
        else if (value !== name) {
            deleteLink();
        }
        setMode("list");
    }

    function openLink(){
        window.open(savedLinks[name].link, "_blank");
    }

    function updateLink(){
        //TODO: Implement updateLink
    }

    function saveLink(){
        setPresets((p : obj) => ({...p, [name]: {link: savedLinks[name].link, params: savedLinks[name].params}}));
        setPriority("presets");
    }
    return (
        <div id={`link-${name}`} className="Link row" style={{width: "100%"}} {...props}>
            {(name === "?") ? 
            <>
                <input className="link-item" autoFocus onBlur={changeLink} onChange={changeValue} value={value}></input>
            </> :
            (mode === "list") ?
            <>
                <div>
                    <div className="link-item vite-style link-name" onDoubleClick={editLink}>{name}</div>
                </div>
                <div className="col" style={{width: "20px"}}>
                    <button className="link-item link-button" onClick={useLink}>Use</button>
                    <button className="link-item link-button" onClick={openLink}>Open</button>
                </div>
                <div className="col" style={{width: "min-content"}}>
                    <button className="link-item link-button" onMouseDown={copyLink}>Copy</button>
                    <button className="link-item link-button" onMouseDown={saveLink}>Save</button>
                </div>
            </> :
            <>
                <div>
                    <input className="link-item link-input" maxLength={20} autoFocus onBlur={changeLink} onChange={changeValue} value={value}></input>
                </div>
                <div className="col">
                    <button className="link-item link-button" onMouseDown={deleteLink}>Delete</button>
                    <button className="link-item link-button" onMouseDown={updateLink}>Update</button>
                </div>
                {/* <input className="link-item link-input" autoFocus onBlur={changeLink} onChange={changeValue} value={value}></input>
                <button className="link-item link-button" onMouseDown={deleteLink}>Delete</button>
                <button className="link-item link-button" onMouseDown={deleteLink}>Upda</button> */}
            </>}
        </div>

    );
}

export default Link;