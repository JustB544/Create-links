import React, {useContext, useEffect, useState} from "react";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import { sortPriority } from "../helpers/functions";
import './SavedLinks.css';
import Link from "../Link/Link";

function SavedLinks({...props}){
    const [hidden, setHidden] = useState(true);
    const {baseLink, fullLink, savedLinks, setSavedLinks, curData, setPriority} = useContext<obj>(MainContext);

    function addLink(){
        setHidden(false);
        const params : obj = {};
        Object.keys(curData).forEach(k => params[k] = curData[k].value);
        setSavedLinks((s : obj) => ({...s, "?": {link: new URL(fullLink).protocol + "//" + baseLink + "?" + new URLSearchParams(params).toString(), params: {...curData}}}));
        setPriority("savedLinks");
    }
    return (
        <ExpandableBox name="Saved Links" emptyText="No links saved yet" isEmpty={Object.keys(savedLinks).length === 0} isHidden={hidden} hide={(h: boolean) => setHidden(h)} {...props}>
            {sortPriority(savedLinks).map(s => <div key={s} className="max-w"><hr/><Link name={s} /></div>)}
            <hr/>
            <button className={`eb-extension${(baseLink) ? "" : " inactive"}`} onClick={() => {if (baseLink) addLink()}}>Add</button>
        </ExpandableBox>
    );
}

export default SavedLinks;