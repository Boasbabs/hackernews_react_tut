import React from 'react';
import Button from '../Button';
import './index.css';



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


export default Table;
