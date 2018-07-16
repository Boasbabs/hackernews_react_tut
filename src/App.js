import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const list = [
    {
        title: "React",
        url: "https://facebook.github.io/react",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: "Redux - Written by Simeon",
        url: "https://facebook.github.io/react",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
        objectID: 1,
    }
];
/*
function isSearched(searchTerm) {
    return function (item) {
        // some condition which returns true or false
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }

}
*/
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

/*
// ES6 Class Component
class Search extends Component {
    render() {
        const { value, onChange, children } = this.props;
        return (
            <form action="">
                {children}
                <input type="text"
                       value={value}
                       onChange={onChange}
                />
            </form>
        )
    }
}

class Table extends Component {
    render() {
        const {list, pattern, onDismiss } = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern)).map(item => {

                    return (
                        <div key={item.objectID}>
                      <span>
                          <a href={item.url}>{item.title}</a>
                          <br/>
                      </span>
                            <span>{item.author}</span> &nbsp;
                            <span>{item.num_comments}</span>,&nbsp;
                            <span>{item.points}</span>&nbsp;
                            <br/>
                            <span>
                                <Button
                                    onClick={() => onDismiss(item.objectID)} >
                                    Dismiss 2
                                </Button>
                            </span>
                        </div>
                    );
                })}
            </div>
        )
    }
}


class Button extends Component{
    render() {
        const {
            onClick,
            className = "",
            children,
        } = this.props;

        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {children}
            </button>
        )
    }
}
*/

//Search Functional stateless Component
const Search = ({value, onChange, children}) =>
    <form action="">
        {children}
        <input type="text"
               value={value}
               onChange={onChange}
        />
    </form>


//Table Functional stateless Component
const Table = ({list, pattern, onDismiss}) =>
    <div className="table">
        {list.filter(isSearched(pattern)).map(item => {

            return (
                <div key={item.objectID} className="table-row">
                    <span style={{ width: '40%' }}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{ width: '30%' }}>
                        {item.author}
                    </span>
                    <span style={{ width: '10%' }}>
                        {item.num_comments}
                    </span>
                    <span style={{ width: '10%' }}>
                        {item.points}
                    </span>
                    <span style={{ width: '10%' }}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className=""
                        >
                        Dismiss
                        </Button>
                    </span>
                </div>
            );
        })}
    </div>

//Button Functional stateless Component
const Button = ({onClick, className="", children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        {children}
    </button>


class App extends Component {
    /*
    // For performance, I use public class fields
    state = {
        list,
        searchTerm: "",
    };

    onDismiss = id => {
        const isNotId = item => item.objectID !== id;

        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList })
    };

    onSearchChange = event => {
        this.setState({ searchTerm: event.target.value })};
    // end of optimization
    */

    constructor(props){
        super(props);

        this.state = {
            list,
            searchTerm: "",
        }

        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;

        const updatedList = this.state.list.filter(isNotId)
        this.setState({ list: updatedList })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

    render() {
        const { searchTerm, list } = this.state;
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                    >
                        Search
                    </Search>
                </div>

                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
