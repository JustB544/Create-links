import React, { useContext } from "react";
import "./GenerateLinks.css";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";
import { sortPriority } from "../helpers/functions";

function GenerateLinks({...props}){
    const {savedLinks} = useContext<obj>(MainContext);

    function generate(){
        sortPriority(savedLinks).forEach((sl : string) => window.open(savedLinks[sl].link, "_blank"));
    }

    return (
        <button className="GenerateLinks" {...props} onClick={generate}>Generate</button>
    );
}

export default GenerateLinks;