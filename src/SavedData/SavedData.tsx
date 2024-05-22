import React, {useContext, useEffect, useState} from "react";
import Data from "../Data/Data";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { obj } from "../helpers/interfaces";
import MainContext from "../Context/MainContext";

function SavedData({...props}){
    const {data, setData} = useContext<obj>(MainContext);
    return (
        <ExpandableBox name="Data" emptyText="No data currently" isEmpty={Object.keys(data).length === 0} {...props}>
            {Object.keys(data).map(s => <Data key={s} name={s} data={data[s]} mode="change"/>)}
        </ExpandableBox>
    );
}

export default SavedData;