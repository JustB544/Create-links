import React, {useEffect, useState} from "react";
import ExpandableBox from "../ExpandableBox/ExpandableBox";
import Addlinks from "../Addlinks/Addlinks";
import './SavedLinks.css';

function SavedLinks({...props}){
    const [hidden, setHidden] = useState(false);
    return (
        <ExpandableBox name="Saved Links" emptyText="No links saved yet" isEmpty={true} isHidden={hidden} hide={(h: boolean) => setHidden(h)} {...props}>
            <div></div>
            <Addlinks className="eb-extension" onClick={() => setHidden(false)}/>
        </ExpandableBox>
    );
}

export default SavedLinks;