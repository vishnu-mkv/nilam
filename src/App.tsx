import React from 'react';
import './App.css';
import Login from './app/components/login';
import { getAuth } from "firebase/auth";
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/slices/userSlice';

function App() {

	const auth = getAuth();
	const dispatch = useAppDispatch();

  auth.onAuthStateChanged(function(user) {
    if(user) {
      //  get user data saved on local storage
      // check if uid matches and then set user
      let localUserData = localStorage.getItem('user');

      if(localUserData) {
        let localUser = JSON.parse(localUserData);
        if(localUser.uid.trim() === user.uid){
          dispatch(setUser(localUser));
        }
      }
    }
  })

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Login/>
    </div>
  );
}

export default App;
