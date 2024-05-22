import React, {useContext} from "react";
import Data from "../Data/Data";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import "./CurrentData.css";
import ExpandableBox from "../ExpandableBox/ExpandableBox";

function CurrentData({...props}){
    const {curData, setCurData} = useContext<obj>(MainContext);
    return (
        <ExpandableBox name="Current Data" emptyText="No data currently used" isEmpty={Object.keys(curData).length === 0} {...props}>
            {Object.keys(curData).map(s => <Data key={s} name={s} data={curData[s]} mode="change"/>)}
        </ExpandableBox>
    );
}

export default CurrentData;