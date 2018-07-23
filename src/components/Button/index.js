import React from "react";
import "./index.css";

//Button Functional stateless Component
const Button = ({onClick, className="", children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>


export default Button;