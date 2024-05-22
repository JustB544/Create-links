import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Autofill.css";

function Autofill({...props}){
    const {data, setData, curData, setCurData, baseLink, setBaseLink} = useContext<obj>(MainContext);
    const [buttonState, setButtonState] = useState<string>("invalid");

    useEffect(() => {
        if (baseLink !== "" && isUrl(baseLink) && baseLink.includes("/?")){
            setButtonState("valid");
        }
        else {
            setButtonState("invalid");
        }
    }, [baseLink]);

    function isUrl(s : string) : boolean{
        try {
            new URL(s);
            return true;
        }
        catch {
            return false;
        }
    }

    function autofill() : void{
        if (buttonState !== "valid"){
            return;
        }
        let url = new URL(baseLink);
        let search = url.search;
        let params = new URLSearchParams(search);
        let _data : obj = {};
        let _curdata : obj = {};
        params.forEach((v : string, k : string) => {
            _data[k] = "";
            _curdata[k] = v;
        });
        setData(_data);
        setCurData(_curdata);
    }
    return (
        <button className={"Autofill " + buttonState} {...props} onClick={autofill}>Autofill</button>
    );
}

export default Autofill;