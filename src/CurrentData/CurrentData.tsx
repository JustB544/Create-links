import React, {useContext, useReducer, useEffect} from "react";
import Data from "../Data/Data";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./CurrentData.css";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { sortPriority } from "../helpers/functions";

function CurrentData({...props}){
    const {curData, setCurData} = useContext<obj>(MainContext);
    return (
        <ExpandableBox name="Current Data" emptyText="No data currently used" isEmpty={Object.keys(curData).length === 0} {...props}>
            {sortPriority(curData).map(s => <div key={s} className="max-w"><hr/><Data name={s} mode="change"/></div>)}
        </ExpandableBox>
    );
}

export default CurrentData;