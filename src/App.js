import React, { Component } from 'react';
import './App.css';


const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = '100';
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";


/*
function isSearched(searchTerm) {
    return function (item) {
        // some condition which returns true or false
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }

}

const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
*/

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
const Search = ({value, onChange, onSubmit, children}) =>
    <form onSubmit={onSubmit}>
        {children}
        <input type="text"
               value={value}
               onChange={onChange}
        />
        <button type="submit">{children}</button>
    </form>


//Table Functional stateless Component
const Table = ({list, pattern, onDismiss}) =>
    <div className="table">
        {list.map(item => {

            return (
                <div key={item.objectID} className="table-row">
                    <span style={{ width: '40%' }}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{ width: '20%' }}>
                        {item.author}
                    </span>
                    <span style={{ width: '15%' }}>
                        {item.num_comments} comments
                    </span>
                    <span style={{ width: '15%' }}>
                        {item.points} points
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
            results: null,
            searchKey: "",
            searchTerm: DEFAULT_QUERY,
        }

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;

        const updatedHits = hits.filter(isNotId);

        this.setState({
            // creating a new objects
            // result: Object.assign({}, this.state.result, { hits: updatedHits})
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page}
            }
        })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });

        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }

    setSearchTopStories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;

        // check for new search or old search, new search are not on first page
        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

        const updatedHits = [ ...oldHits, ...hits ];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page}
            }
        });
    }

    fetchSearchTopStories(searchTerm, page=0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(error => error)
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // lifecycle method to make asynchronous call
    componentDidMount(){
        const { searchTerm } = this.state;

        this.setState({ searchKey: searchTerm })
        this.fetchSearchTopStories(searchTerm)

    }

    render() {
        const { searchTerm, results, searchKey } = this.state;
        const page = (results &&  results[searchKey] && results[searchKey].page) || 0;
        const list = (results &&  results[searchKey] && results[searchKey].hits) || [];

        // to handle failed API request
        // if(!results) {return null;}

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search &nbsp;
                    </Search>
                </div>


                <Table
                    list={list}
                    onDismiss={this.onDismiss}
                />

                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
