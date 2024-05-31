import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Data.css";

interface DataProps {
    name: string;
    mode: string;
    [propName: string]: any;

}

function Data({name, mode, ...props} : DataProps){
    const {data, setData, curData, setCurData, setPriority} = useContext<obj>(MainContext);
    const [_mode, setMode] = useState(mode);
    const [value, setValue] = useState("");
    const [displayName, setDisplayName] = useState(name);

    useEffect(() => {
        if (mode !== _mode){
            if (_mode === "nickname" && data[name].nickname !== value) changeNickname();
            setMode(mode);
        }
        if (mode === "nickname") setValue(data[name].nickname);
        else if (curData[name]) setValue(curData[name].value);
        if (data[name].nickname !== "") setDisplayName(data[name].nickname);
        else if (displayName !== name) setDisplayName(name);
    }, [mode, displayName, data[name]]);

    function addToData(){
        setData({...data, [value]: {nickname: ""}});
        setValue("");
        setPriority("data");
    }

    function editData(){
        setMode("add");
        setValue(name);
    }

    function changeNickname(){
        setData((s : obj) => ({...s, [name]: {nickname: value}}));
        if (curData[name]) {
            setCurData((s : obj) => ({...s, [name]: {value: s[name].value, nickname: value}}));
            setPriority("curData");
        }
        setPriority("data")
    }

    function changeData(){
        if (value !== "" && value !== name){
            setData((s : obj) => {
                let _s = {...s};
                delete _s[name];
                _s[value] = s[name];
                return _s;
            });
            setCurData((s : obj) => {
                let _s = {...s};
                delete _s[name];
                _s[value] = s[name];
                return _s;
            });
            setPriority("data");
            setPriority("curData");
        }
        else if (value === "") {
            deleteData();
        }
        setMode("list");
    }

    function deleteCurData(){
        setCurData((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
    }

    function changeValue(e : any){
        setValue(e.target.value);
    }

    function changeCurData(e : any){
        setValue(e.target.value);
        setCurData((s : obj) => {
            let _s = {...s};
            _s[name].value = e.target.value;
            return _s;
        });
    }

    function addCurData(){
        setCurData({...curData, [name]: {value: "", nickname: data[name].nickname}});
    }

    function deleteData(){
        setData((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
        setCurData((s : obj) => {
            let _s = {...s};
            delete _s[name];
            return _s;
        });
        setPriority("data");
        setPriority("curData");
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