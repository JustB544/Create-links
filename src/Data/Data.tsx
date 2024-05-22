import React, {useContext, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Data.css";

interface DataProps {
    data: any;
    mode: string;
    [propName: string]: any;

}

function Data({name, data, mode, ...props} : DataProps){
    const {Datas, setData, curData, setCurData} = useContext<obj>(MainContext);
    const [_mode, setMode] = useState(mode);
    const [value, setValue] = useState("");

    function addToData(){
        setData({...Datas, [value]: {}});
        setValue("");
    }

    function editData(){
        setMode("add");
        setValue(name);
    }

    function changeData(){
        setData((s : obj) => {
            let _s = {...s};
            delete _s[name]
            _s[value] = s[name];
            return _s;
        });
        // setCurDatas((s) => {
        //     let _s = {...s};
        //     delete _s[name]
        //     _s[value] = s[name];
        //     return _s;
        // });
        setMode("list");
    }

    function deleteCurData(){
        setCurData((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
    }

    function changeValue(e : any){
        setValue(e.target.value);
    }

    function addCurData(){
        setCurData({...curData, [name]: {}});
    }

    function deleteData(){
        setData((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
        setCurData((s : obj) => {
            let _s = {...s};
            delete _s[name]
            return _s;
        });
    }

    return (
        <div className="row" style={{width: "100%"}} {...props}>
            {(_mode === "change") ?
            <>
                <button className="data-item" onClick={() => {setMode("add")}}>{name}</button>
                <input className="data-item" onChange={changeValue} value={value}></input>
            </> : 
            (_mode === "list") ? 
            <>
                <div className="data-item vite-style" onDoubleClick={editData}>{name}</div>
                <button className="data-item" onClick={addCurData}>Add</button>
            </> :
            // All options past here have _mode === "add"
            (mode === "list") ?
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