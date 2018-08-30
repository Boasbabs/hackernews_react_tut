import React from "react";
import PropTypes from "prop-types";
import "./index.css";

//Search Functional stateless Component
const Search = ({value, onChange, onSubmit, children}) =>
    <form onSubmit={onSubmit}>
        {children}
        <input type="text"
               value={value}
               onChange={onChange}
        />
        <button type="submit">{children}</button>
    </form>

Search.PropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Search;