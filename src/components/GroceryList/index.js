import React, { useState } from "react";
import axios from 'axios';
import Navbar from '../Navbar';
import CurrentList from './CurrentList';


const Home = (props) => {

    /* Track the state of your app instead. Start with a "loading" state */
    //const [state, setState] = useState('loading');
    const [data, setData] = useState('');
    /*************************************************************************************** */
    /*                  These are the Methods of Current List Child                          */
    /*************************************************************************************** */
    const getCurrentListItems = async () =>  {
        //const res = await axios.get('https://xvdhu.sse.codesandbox.io/api/currentList');
        const res = await axios.get('http://localhost:4000/api/currentList');
        if(res.data.length !== 0) {
            setData(res.data);
            return true;
        }else{
            setData('')
            return false;
        }
        
    }
    const createCurrentListItem = async (item) => {
        await axios.post('http://localhost:4000/api/currentList', item)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    const deleteCurrentItem = async (id) => {
        await axios.delete('http://localhost:4000/api/currentList/'+id)
                    .then(function(res){
                        console.log(res);
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    const updateCheckedItem = async (itemId, itemName) => {
        const itemToUpdate = {
            "itemName": itemName,
            "itemStatus": "Checked"
        };

        await axios.put('http://localhost:4000/api/currentList/'+itemId, itemToUpdate)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    const updateCheckedItemToActive = async (itemId, itemName) => {
        const itemToUpdate = {
            "itemName": itemName,
            "itemStatus": "Active"
        };
        await axios.put('http://localhost:4000/api/currentList/'+itemId, itemToUpdate)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }
    /*************************************************************************************** */
    /*************************************************************************************** */

   /* useEffect(() => {
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
/*if(state === 'loading') {
        return <div>Loading..</div>
    }*/

    return (
        <div>
            <Navbar userId={props.userId} userName={props.userName}/>
            <h4 className="componentTitle">Currently At Home</h4>
            <CurrentList 
                updateValues={getCurrentListItems} 
                updateCheckedItem={updateCheckedItem}
                updateCheckedItemToActive={updateCheckedItemToActive}
                createItem={createCurrentListItem}
                deleteItem={deleteCurrentItem}
                inicialItems={data}
            />
        </div>
    );
};

export default Home;