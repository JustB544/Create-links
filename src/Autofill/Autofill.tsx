import React, {useContext, useEffect, useState} from "react";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import { setPriority } from "../helpers/functions";
import { usePub } from "../helpers/pubsub";
import "./Autofill.css";

interface AutofillProps {
    restrict: boolean;
    [propName: string]: any;
}

function Autofill({restrict, ...props} : AutofillProps){
    const {data: [data, setData], link: {fullLink: [fullLink], baseLink: [baseLink]}} = useContext<obj>(MainContext);
    const [buttonState, setButtonState] = useState<string>("invalid");
    const publish = usePub();

    useEffect(() => {
        if (baseLink !== "" && new URL(fullLink).search.length > 0){
            setButtonState("valid");
        }
        else {
            setButtonState("invalid");
        }
    }, [baseLink, fullLink]);

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
        let _data : obj = {};
        // if (data[baseLink]){
        //     _data = {...data[baseLink]};
        // }
        // const _curData : obj = {};
        params.forEach((v : string, k : string) => {
            if (restrict && !data[k] && Object.keys(data).length != 0) return;
            _data[k] = (data[k]) ? {nickname: data[k].nickname} : {nickname: ""};
            if (v && (!data[k] || !data[k].value)) _data[k].value = v;
            else if (data[k] && data[k].value) _data[k].value = data[k].value;
        });
        setData((d : obj) => ({...d, ..._data}));
        setPriority(setData);
        publish("autofill");
    }
    return (
        <button className={"Autofill " + buttonState} {...props} onClick={autofill}>Autofill</button>
    );
}

export default Autofill;