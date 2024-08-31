import React, {Children, useState, useEffect, ReactElement} from "react";
import "./ExpandableBox.css";

interface ExpandableBoxProps {
    children: any;
    name: string;
    emptyText: string;
    isEmpty: boolean;
    isHidden?: boolean;
    hide?: (h: boolean) => void;
    [propName: string]: any;
}

/**Wrapper component that adds an expandable box */
function ExpandableBox({children, name, emptyText, isEmpty, isHidden = true, hide = (h: boolean) => {}, ...props} : ExpandableBoxProps){
    const [hidden, setHidden] = useState(isHidden);
    useEffect(() => {
        setHidden(isHidden);
    }, [isHidden]);

    function toggleSettingsList(){
        hide(!hidden);
        setHidden(!hidden);
    }
    return (
        <div className="ExpandableBox" {...props}>
            <div className="eb-header">
                <h3>{name}</h3>
                <span onClick={toggleSettingsList}>{(hidden) ? "+" : "-"}</span>
            </div>
            <div className={`eb-list ${(hidden) ? "hidden" : ""}`}>
                {(isEmpty) ? <p>{emptyText}</p> : ""}
                {Children.map(children, (child : ReactElement) => {
                    return (!(child.props.className && child.props.className.split(" ").includes("eb-extension"))) ? child : <></>;
                })}
            </div>
            <div className="eb-extention">
                {Children.map(children, (child : ReactElement) => {
                    return ((child.props.className && child.props.className.split(" ").includes("eb-extension"))) ? child : <></>;
                })}
            </div>
        </div>
    );
}

export default ExpandableBox;