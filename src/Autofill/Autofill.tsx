import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./Autofill.css";

function Autofill({...props}){
    const {setData, setCurData, fullLink, setPriority} = useContext<obj>(MainContext);
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
        // let url = new URL(fullLink);
        // let search = url.search;
        // let params = new URLSearchParams(search);
        const params = new URLSearchParams(new URL(fullLink).search);
        const _data : obj = {};
        const _curdata : obj = {};
        params.forEach((v : string, k : string) => {
            _data[k] = {nickname: ""};
            _curdata[k] = {value: v, nickname: ""};
        });
        setData((d : obj) => ({...d, ..._data}));
        setCurData(_curdata);
        setPriority("data");
        setPriority("curData");
    }
    return (
        <button className={"Autofill " + buttonState} {...props} onClick={autofill}>Autofill</button>
    );
}

export default Autofill;