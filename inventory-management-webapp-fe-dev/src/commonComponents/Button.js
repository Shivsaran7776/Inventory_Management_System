import React from "react";

//css
import '../css/index.css';
import '../css/login.css';

const Button = (props) => {
    return(
        <button className="greenButton" id={props.id}>{props.value}</button>
    );
}

export default Button;