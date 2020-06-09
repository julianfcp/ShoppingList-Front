 import React, { useState, useEffect } from "react";
 import { Route, Redirect } from "react-router-dom";
 import getSession from '../verifyAuth/verifyJwt';

 const PrivateRoute = ({ component: Component, ...rest }) => {
 
   /* Track the state of your app instead. Start with a "loading" state */
   const [state, setState] = useState('loading');
   const [userId, setUserID] = useState('');
 
   useEffect(() => {
     (async function() {
       try {
         /* Update effect logic to track correct state */
         const sessionData = await getSession();
         const isUserLogged = sessionData.success;
         const userID = sessionData.userId._id;
         setUserID(userID);
         setState(isUserLogged ? 'loggedin' : 'redirect');
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
     <Route
       {...rest}
       /* Decide what component to render based on state */
       render={props => ((state === 'loggedin') ? 
         <Component {...props} userId={userId}/> : 
         <Redirect to={'/login'} />) }
     />
   );
 };
 
 export default PrivateRoute;