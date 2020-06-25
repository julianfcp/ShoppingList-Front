import React, { useState  } from "react";
import axios from 'axios';
import Navbar from '../../Navbar/';
import CurrentList from '../../GroceryList/CurrentList';
import ListName from './ListName';
import ListDescription from './ListDescription';
import ListInstructions from './ListInstructions';


const ListView = (props) => {

    /* Track the state of your app instead. Start with a "loading" state */
    //const [state, setState] = useState('');
    const [data, setData] = useState('');

    /*************************************************************************************** */
    /*                  These are the Methods of Current List Child                          */
    /*************************************************************************************** */

    const getListItems = async () =>  {
        //const res = await axios.get('https://xvdhu.sse.codesandbox.io/api/currentList');

        await axios.get('http://localhost:4000/api/listItems', {
            params: {
                listId: props.match.params.listId
            }
          }).then(res => {
            if(res.data.items.length !== 0) {
                setData(res.data.items);
                return true;
            }else{
                return false;
            }
          })

        
        
    }
    const createListItem = async (item) => {
        const newitem = {
            itemName: item.itemName,
            itemStatus: item.itemStatus,
            listId: props.match.params.listId
        }
        await axios.post('http://localhost:4000/api/listItems', newitem)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }

    const deleteListItem = async (id) => {
        await axios.delete('http://localhost:4000/api/listItems/'+id)
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
        console.log(itemId);

        await axios.put('http://localhost:4000/api/listItems/'+itemId, itemToUpdate)
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
        await axios.put('http://localhost:4000/api/listItems/'+itemId, itemToUpdate)
                    .then(function(res){ 
                        console.log(res)
                    })
                    .catch(function(error){
                        console.log(error)
                    });
    }
    /*************************************************************************************** */
    /*************************************************************************************** */

    /*useEffect(() => {
        (async function() {
            try {
                const isDataloaded = await getListItems();
                setState(isDataloaded ? 'dataloaded' : 'redirect');
            }
            catch {
                setState('redirect');
            }
        })();
    }, []);*/

    /* If in loading state, return loading message while waiting for 
    isValidToken to complete */
   /* if(state === 'loading') {
        return <div>Loading..</div>
    }*/

    return (
        <div>
            <Navbar userId={props.userId} userName={props.userName}/>
            <ListName listName={props.match.params.listId}/>
            <hr />
            <ListDescription />
            <ListInstructions />
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