import React, {useContext, useState, useEffect} from "react";
import Data from "../Data/Data";
import MainContext from "../Context/MainContext";
import { obj } from "../helpers/interfaces";
import { useSub } from "../helpers/pubsub";
import "./CurrentData.css";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import { sortPriority } from "../helpers/functions";

function CurrentData({...props}){
    const {data: [data, setData], curData} = useContext<obj>(MainContext);
    const [hidden, setHidden] = useState<boolean>(true);

    useSub("autofill", () => {
        setHidden(false);
    });

    useSub("usepreset", () => {
        setHidden(false);
    });

    return (
        <ExpandableBox name="Current Data" emptyText="No data currently used" isEmpty={Object.keys(curData).length === 0} isHidden={hidden} hide={setHidden} {...props}>
            {sortPriority(curData).map(s => <div key={s} className="max-w"><hr/><Data name={s} mode="change"/></div>)}
        </ExpandableBox>
    );
}

export default CurrentData;