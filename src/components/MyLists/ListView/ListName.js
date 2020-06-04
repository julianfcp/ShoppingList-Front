import React, { useState, useEffect } from "react";
import axios from 'axios';


export default (props) => {
    const [listName, setListName] = useState('');


    useEffect(() => {
        axios.get('http://localhost:4000/api/lists/'+props.listName)
            .then(res => {
                setListName(res.data.listName);
            })
    })

    return (
        <div className="componentTitle">
            <h4>{listName}</h4>
        </div>
    )

}
