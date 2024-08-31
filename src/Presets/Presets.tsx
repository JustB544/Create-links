import React, {useContext, useState} from "react";
import { obj } from "../helpers/interfaces";
import Preset from "../Preset/Preset";
import { sortPriority } from "../helpers/functions";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import './Presets.css';
import MainContext from "../Context/MainContext";

function Presets({...props}){
    const {presets: [presets, setPresets]} = useContext<obj>(MainContext)
    const [hidden, setHidden] = useState<boolean>(true);
    return (
        <ExpandableBox name="Presets" emptyText="No presets currently" isEmpty={Object.keys(presets).length === 0} isHidden={hidden} hide={setHidden} {...props}>
            {sortPriority(presets).map(p => <div key={p} className="max-w"><hr/><Preset name={p} preset={presets[p]}/></div>)}
        </ExpandableBox>
    );
    // return (
    //     <div id="presets" {...props}>
    //         <h3>Presets</h3>
    //         {Object.keys(presets).map((p) => <Preset key={p} name={p} preset={presets[p]}/>)}
    //     </div>
    // );
}

export default Presets;