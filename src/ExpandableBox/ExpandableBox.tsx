import React, {Children, useState, useEffect} from "react";
import slugify from "slugify";
import "./ExpandableBox.css";

interface ExpandableBoxProps {
    children: any;
    name: string;
    emptyText: string;
    isEmpty: boolean;
    [propName: string]: any;
}

/**Wrapper component that adds an expandable box */
function ExpandableBox({children, name, emptyText, isEmpty, ...props} : ExpandableBoxProps){
    const [hidden, setHidden] = useState(true);
    let ebElement : any;
    const id : string = `eb-${slugify(name, {lower: true})}`;
    useEffect(() => {
        ebElement = document.querySelector("#" + id);
    });

    function toggleSettingsList(){
        setHidden(!hidden);
        ebElement.classList.toggle("hidden");
    }
    return (
        <div className="ExpandableBox" {...props}>
            <div className="eb-header">
                <h3>{name}</h3>
                <span onClick={toggleSettingsList}>{(hidden) ? "+" : "-"}</span>
            </div>
            <div id={id} className="eb-list hidden">
                {(isEmpty) ? <p>{emptyText}</p> : ""}
                {Children.toArray(children)}
            </div>
        </div>
    );
}

export default ExpandableBox;