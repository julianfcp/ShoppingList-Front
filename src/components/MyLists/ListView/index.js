import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../../Navbar/';
import CurrentList from '../../Home/CurrentList';
import ListName from './ListName';

const ListView = (props) => {

    /* Track the state of your app instead. Start with a "loading" state */
    const [state, setState] = useState('loading');
    const [data, setData] = useState('');

    /*************************************************************************************** */
    /*                  These are the Methods of Current List Child                          */
    /*************************************************************************************** */

    const getListItems = async () =>  {
        //const res = await axios.get('https://xvdhu.sse.codesandbox.io/api/currentList');
        const res = await axios.get('http://localhost:4000/api/currentList');
        setData(res.data);

        if(res.data.length !== 0) {
            return true;
        }else{
            setData('')
            return false;
        }
        
    }
    const createListItem = async (item) => {
        await axios.post('http://localhost:4000/api/currentList', item)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    const deleteListItem = async (id) => {
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

    useEffect(() => {
        (async function() {
        try {
            const isDataloaded = await getListItems();
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
            <ListName listName={props.match.params.listId}/>
            <CurrentList 
                updateValues={getListItems} 
                updateCheckedItem={updateCheckedItem}
                updateCheckedItemToActive={updateCheckedItemToActive}
                createItem={createListItem}
                deleteItem={deleteListItem}
                inicialItems={data}
            />
        </div>
    );
};

export default ListView;