import React, {useState, useEffect} from "react";
import './Link.css';

function Link(){
    const [value, setValue] = useState("");
    const [rows, setRows] = useState(2);

    function setTextAreaInput(e) {
        const val = e.target.value;
        const target = e.target;
        setValue(val);

        target.style.height = target.style.minHeight = 'auto';
        target.style.minHeight = `${ Math.min(target.scrollHeight, parseInt(target.style.maxHeight)) }px`;
        target.style.height = `${ Math.max(target.scrollHeight, 20) }px`;
    }

    return (
        <textarea cols={20} onChange={(e) => {setTextAreaInput(e)}} className="Link" placeholder="Base link" value={value}/>
    );
}

export default Link;