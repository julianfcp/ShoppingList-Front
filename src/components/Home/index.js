import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../Navbar/';
import CurrentList from './CurrentList';

const Home = () => {

    /* Track the state of your app instead. Start with a "loading" state */
    const [state, setState] = useState('loading');
    const [data, setData] = useState('');

    const getCurrentListItems = async () =>  {
        const res = await axios.get('http://localhost:4000/api/currentList');
        setData(res.data);
        if(res.data.length !== 0) {
            return true;
        }else{
            setData('')
            return false;
        }
        
    }

    useEffect(() => {
        (async function() {
        try {
            const isDataloaded = await getCurrentListItems();
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

    return (
        <div>
            <Navbar />
            <h4 className="componentTitle">Currently At Home</h4>
            <CurrentList inicialItems={data}/>
        </div>
    );
};

export default Home;