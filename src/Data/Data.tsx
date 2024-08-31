import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import { setPriority } from "../helpers/functions";
import "./Data.css";

interface DataProps {
    name: string;
    mode: string;
    [propName: string]: any;

}

function Data({name, mode, ...props} : DataProps){
    const {data: [data, setData]} = useContext<obj>(MainContext);
    const [_mode, setMode] = useState(mode);
    const [value, setValue] = useState("");
    const [displayName, setDisplayName] = useState(name);

    useEffect(() => {
        if (Object.keys(data).length == 0) return;
        if (mode !== _mode){
            if (_mode === "nickname" && data[name].nickname !== value) changeNickname();
            setMode(mode);
        }
        if (mode === "nickname") setValue(data[name].nickname);
        // else if (curData[name]) setValue(curData[name].value);
        else if (data[name] && data[name].value) setValue(data[name].value);
        if (data[name].nickname !== "") setDisplayName(data[name].nickname);
        else if (displayName !== name) setDisplayName(name);
    }, [mode, displayName, data[name]]);

    function addToData() : void{
        setData((d : obj) => ({...d, [value]: {nickname: ""}}));
        setValue("");
        setPriority(setData);
    }

    function editData(){
        setMode("add");
        setValue(name);
    }

    function changeNickname() : void{
        setData((s : obj) => ({...s, [name]: {nickname: value, priority: s[name].priority}}));
        setPriority(setData);

    }

    function changeData(){
        if (value !== "" && value !== name){
            setData((s : obj) => {
                let _s = {...s};
                delete _s[name];
                _s[value] = s[name];
                return _s;
            });
            setPriority(setData);
        }
        else if (value === "") {
            deleteData();
        }
        setMode("list");
    }

    function deleteCurData() : void {
        setData((s : obj) => {
            let _s = {...s};
            delete _s[name].value
            return _s;
        });
    }

    function changeValue(e : any) : void {
        setValue(e.target.value);
    }

    function changeCurData(e : any) : void {
        setValue(e.target.value);
        setData((s : obj) => {
            let _s = {...s};
            _s[name].value = e.target.value;
            return _s;
        });
        setPriority(setData);
    }

    function addCurData() : void {
        setData((cd : obj) => ({...cd, [name]: {value: "", ...data[name]}}));
        setPriority(setData);
    }

    function deleteData() : void{
        setData((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
    }

    return (
        <div className="row" style={{width: "100%"}} {...props}>
            {(_mode === "change") ?
            <>
                <button className="data-item" onClick={() => {setMode("add")}}>{displayName}</button>
                <input className="data-item data-button data-input" onChange={changeCurData} value={value}></input>
            </> : 
            (_mode === "list") ? 
            <>
                <div className="data-item vite-style" onDoubleClick={editData}>{displayName}</div>
                <button className="data-item data-button" onClick={addCurData}>Add</button>
            </> :
            (_mode === "nickname") ?
            <>
                <div className="data-item vite-style">{name}</div>
                <input className="data-item data-button" onChange={changeValue} value={value}></input>
            </> : 
            // All options past here have _mode === "add" or mode === new
            (mode === "list" || mode === "new") ?
            <>
                <input className="data-item" autoFocus onBlur={changeData} onChange={changeValue} value={value}></input>
                <button className="data-item data-button" onMouseDown={deleteData}>Delete</button>
            </> : 
            (mode === "change") ? 
            <>
                <div className="data-item vite-style" onClick={() => {setMode("change")}}>{displayName}</div>
                <button className="data-item data-button" onClick={deleteCurData}>Delete</button>
            </> : 
            <>
                <input className="data-item" onChange={changeValue} value={value}></input>
                <button className="data-item data-button" onClick={addToData}>Create</button>
            </>}
        </div>
    );
}

export default Data;