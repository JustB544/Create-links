import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Data.css";

interface DataProps {
    name: string;
    data: any;
    mode: string;
    [propName: string]: any;

}

function Data({name, data, mode, ...props} : DataProps){
    const {_data, setData, curData, setCurData} = useContext<obj>(MainContext);
    const [_mode, setMode] = useState(mode);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(curData[name]);
    }, []);

    function addToData(){
        setData({..._data, [value]: {}});
        setValue("");
    }

    function editData(){
        setMode("add");
        setValue(name);
    }

    function changeData(){
        if (value !== ""){
            setData((s : obj) => {
                let _s = {...s};
                delete _s[name];
                _s[value] = s[name];
                return _s;
            });
        }
        else {
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
        setCurData((s : obj) => ({...s, [name]: e.target.value}));
    }

    function addCurData(){
        setCurData({...curData, [name]: {}});
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
    }

    return (
        <div className="row" style={{width: "100%"}} {...props}>
            {(_mode === "change") ?
            <>
                <button className="data-item" onClick={() => {setMode("add")}}>{name}</button>
                <input className="data-item" onChange={changeCurData} value={value}></input>
            </> : 
            (_mode === "list") ? 
            <>
                <div className="data-item vite-style" onDoubleClick={editData}>{name}</div>
                <button className="data-item" onClick={addCurData}>Add</button>
            </> :
            // All options past here have _mode === "add" or mode === new
            (mode === "list" || mode === "new") ?
            <>
                <input className="data-item" autoFocus onBlur={changeData} onChange={changeValue} value={value}></input>
                <button className="data-item" onMouseDown={deleteData}>Delete</button>
            </> : 
            (mode === "change") ? 
            <>
                <div className="data-item vite-style" onClick={() => {setMode("change")}}>{name}</div>
                <button className="data-item" onClick={deleteCurData}>Delete</button>
            </> : 
            <>
                <input className="data-item" onChange={changeValue} value={value}></input>
                <button className="data-item" onClick={addToData}>Create</button>
            </>}
        </div>
    );
}

export default Data;