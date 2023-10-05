import React from "react";
import { useState } from "react";
import "../css/index.css"


const Navicon = (props) => {
    return(
        <div className="side-links">
           <span class="material-symbols-outlined">{props.class}</span>
                <p>{props.name}</p>
        </div>
    );
}

export default Navicon