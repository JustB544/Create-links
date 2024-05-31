import React, {useState, useEffect, useContext} from "react";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";
import './BaseLink.css';

function BaseLink({...props}){
    const [rows, setRows] = useState<number>(2);
    const {baseLink, setBaseLink, fullLink, setFullLink} = useContext<obj>(MainContext);

    useEffect(() => {
        try {
            const url = new URL(fullLink);
            setBaseLink(url.host + url.pathname);
        }
        catch {
            setBaseLink("");
        }
        const target : HTMLElement = document.querySelector(".BaseLink") as HTMLElement;
        target.style.height = target.style.minHeight = 'auto';
        target.style.minHeight = `${ Math.min(target.scrollHeight, parseInt(target.style.maxHeight)) }px`;
        target.style.height = `${ Math.max(target.scrollHeight, 20) }px`;
    }, [fullLink]);

    function setTextAreaInput(e : any) {
        const val : string = e.target.value;
        const target : HTMLElement = e.target;
        try {
            const url = new URL(val);
            setBaseLink(url.host + url.pathname);
        }
        catch {
            setBaseLink("");
        }
        setFullLink(val);

        target.style.height = target.style.minHeight = 'auto';
        target.style.minHeight = `${ Math.min(target.scrollHeight, parseInt(target.style.maxHeight)) }px`;
        target.style.height = `${ Math.max(target.scrollHeight, 20) }px`;
    }

    return (
        <textarea cols={20} onChange={(e) => {setTextAreaInput(e)}} className="BaseLink" placeholder="Base link" value={fullLink} {...props}/>
    );
}

export default BaseLink;