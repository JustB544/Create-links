import React from "react";
import Addlinks from "../Addlinks/Addlinks";

function Links({...props}){
    return (
        <div className="Links" {...props}>
            <Addlinks />
        </div>
    );
}

export default Links;