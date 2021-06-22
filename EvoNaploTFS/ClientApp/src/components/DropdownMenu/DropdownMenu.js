import React, { useState, useRef } from "react";

import './DropdownMenu.css'

function DropdownMenu(props) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");

    const content = useRef(null);

    function toogleMenu() {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );
        //setRotateState(
        //    setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
        //);
    }

    return (
        <div className="Dropdownmenu">
            <button className={`Dropdownmenu ${setActive}`} onClick={toogleMenu}>
                <p className="DropdownmenuTitle">{props.title}</p>
            </button>
            <div
                ref={content}
                style={{ maxHeight: `${setHeight}` }}
                className="DropdownmenuContent"
            >
                {props.content}
            </div>
        </div>
    );
}

export default DropdownMenu;
