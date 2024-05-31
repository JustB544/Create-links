import React, {useContext, useEffect, useState, useReducer} from "react";
import Data from "../Data/Data";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";
import { sortPriority } from "../helpers/functions";

function SavedData({...props}){
    const {data, setData, setPriority} = useContext<obj>(MainContext);
    const [hidden, setHidden] = useState<boolean>(true);
    const [nickname, setNickname] = useState<boolean>(false);
    // const [, forceUpdate] = useReducer(x => x + 1, 0);

    // useEffect(() => {
    //     console.log("kemmo");
    //     forceUpdate();
    // }, [data]);

    function newData(){
        setHidden(false);
        setData((s : obj) => ({...s, "?": {nickname: ""}}));
        setPriority("data");
    }

    function nicknameData(){
        setHidden(false);
        setNickname(true);
    }

    function clearData(){
        setHidden(true);
        setData({});
    }
    return (
        <ExpandableBox name="Data" emptyText="No data currently" isEmpty={Object.keys(data).length === 0} isHidden={hidden} hide={(h: boolean) => setHidden(h)} {...props}>
            {sortPriority(data).map(s => <div key={s} className="max-w"><hr/><Data name={s} mode={(nickname) ? "nickname" : (s !== "?") ? "list" : "new"}/></div>)}
            <hr/>
            {(nickname) ? 
                <button className="eb-extension" onClick={() => setNickname(false)}>Back</button> : 
            <>
                <button className="eb-extension" onClick={newData}>New</button>
                <button className="eb-extension" onClick={clearData}>Clear</button>
                <button className="eb-extension" onClick={nicknameData}>Nickname</button>
            </>}
        </ExpandableBox>
    );
}

export default SavedData;