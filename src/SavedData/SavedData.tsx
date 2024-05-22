import React, {useContext, useEffect, useState} from "react";
import Data from "../Data/Data";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";

function SavedData({...props}){
    const {data, setData} = useContext<obj>(MainContext);
    const [hidden, setHidden] = useState<boolean>(true);

    function newData(){
        setHidden(false);
        setData((s : obj) => ({...s, "?": {}}));
    }

    function clearData(){
        setHidden(true);
        setData({});
    }
    return (
        <ExpandableBox name="Data" emptyText="No data currently" isEmpty={Object.keys(data).length === 0} isHidden={hidden} hide={(h: boolean) => setHidden(h)} {...props}>
            {Object.keys(data).map(s => (s !== "?") ? 
                <Data key={s} name={s} data={data[s]} mode="list"/> : 
                <Data key={s} name={s} data={data[s]} mode="new"/>)}
            <button className="eb-extension" onClick={newData}>Add Data</button>
            <button className="eb-extension" onClick={clearData}>Clear Data</button>
        </ExpandableBox>
    );
}

export default SavedData;