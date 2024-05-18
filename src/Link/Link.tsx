import React, {useState, useEffect} from "react";
import './Link.css';

function Link({...props}){
    const [value, setValue] = useState<string>("");
    const [rows, setRows] = useState<number>(2);

    function setTextAreaInput(e : any) {
        const val : string = e.target.value;
        const target : HTMLElement = e.target;
        setValue(val);

        target.style.height = target.style.minHeight = 'auto';
        target.style.minHeight = `${ Math.min(target.scrollHeight, parseInt(target.style.maxHeight)) }px`;
        target.style.height = `${ Math.max(target.scrollHeight, 20) }px`;
    }

    return (
        <textarea cols={20} onChange={(e) => {setTextAreaInput(e)}} className="Link" placeholder="Base link" value={value} {...props}/>
    );
}

export default Link;