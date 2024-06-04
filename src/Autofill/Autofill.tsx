import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Autofill.css";
import { addPriority } from "../helpers/functions";

function Autofill({...props}){
    const {data, setData, curData, setCurData, fullLink, setPriority} = useContext<obj>(MainContext);
    const [buttonState, setButtonState] = useState<string>("invalid");

    useEffect(() => {
        if (fullLink !== "" && isUrl(fullLink) && fullLink.includes("/?")){
            setButtonState("valid");
        }
        else {
            setButtonState("invalid");
        }
    }, [fullLink]);

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
        const params = new URLSearchParams(new URL(fullLink).search);
        const _data : obj = {};
        const _curdata : obj = {};
        params.forEach((v : string, k : string) => {
            _data[k] = {nickname: ""};
            _curdata[k] = {value: v, nickname: ""};
        });
        setData((d : obj) => addPriority({...d, ..._data}));
        setCurData(addPriority(_curdata));
    }
    return (
        <button className={"Autofill " + buttonState} {...props} onClick={autofill}>Autofill</button>
    );
}

export default Autofill;