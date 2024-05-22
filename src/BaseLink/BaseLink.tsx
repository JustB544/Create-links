import React, {useState, useEffect, useContext} from "react";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";
import './BaseLink.css';

function BaseLink({...props}){
    const [value, setValue] = useState<string>("");
    const [rows, setRows] = useState<number>(2);
    const {baseLink, setBaseLink} = useContext<obj>(MainContext);

    function setTextAreaInput(e : any) {
        const val : string = e.target.value;
        const target : HTMLElement = e.target;
        setBaseLink(val);

        target.style.height = target.style.minHeight = 'auto';
        target.style.minHeight = `${ Math.min(target.scrollHeight, parseInt(target.style.maxHeight)) }px`;
        target.style.height = `${ Math.max(target.scrollHeight, 20) }px`;
    }

    return (
        <textarea cols={20} onChange={(e) => {setTextAreaInput(e)}} className="Link" placeholder="Base link" value={baseLink} {...props}/>
    );
}

export default BaseLink;