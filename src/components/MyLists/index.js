import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../Navbar/';
import Lists from './Lists';


const MyLists = (props) => {

    /* Track the state of your app instead. Start with a "loading" state */
    const [state, setState] = useState('loading');
    const [data, setData] = useState('');

    /*************************************************************************************** */
    /*                  These are the Methods of Lists Child                          */
    /*************************************************************************************** */
    const getLists = async () =>  {
        //const res = await axios.get('https://xvdhu.sse.codesandbox.io/api/currentList');
        const res = await axios.get('http://localhost:4000/api/lists');
        setData(res.data);

        if(res.data.length !== 0) {
            return true;
        }else{
            setData('')
            return false;
        }
        
    }
    /*************************************************************************************** */
    /*************************************************************************************** */

    useEffect(() => {
        (async function() {
        try {
            const isDataloaded = await getLists();
            setState(isDataloaded ? 'dataloaded' : 'redirect');
        }
        catch {
            setState('redirect');
        }
        })();
    }, []);

    /* If in loading state, return loading message while waiting for 
    isValidToken to complete */
    if(state === 'loading') {
        return <div>Loading..</div>
    }
    if(data !== ''){
        return (
            <div>
                <Navbar />
                <Lists myLists={data}/>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar userId={props.userId}/>
                <br />
                <h4 className="mt-5">No Lists has been created!</h4>
            </div>
        )
    }

    
};

export default MyLists;