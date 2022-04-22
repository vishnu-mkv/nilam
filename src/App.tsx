import React from "react";
import "./App.css";
import Login from "./app/components/login";
import UserList from "./app/components/UserList";
import CreateUser from "./app/components/CreateUser";
import { getAuth } from "firebase/auth";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/slices/userSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUser from "./app/components/EditUser";

function App() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  auth.onAuthStateChanged(function (user) {
    if (user) {
      //  get user data saved on local storage
      // check if uid matches and then set user
      let localUserData = localStorage.getItem("user");

      if (localUserData) {
        let localUser = JSON.parse(localUserData);
        if (localUser.uid.trim() === user.uid) {
          dispatch(setUser(localUser));
        }
      }
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<UserList />}></Route>
        <Route path="/users">
          <Route path="create" element={<CreateUser />}></Route>
          <Route path="edit" element={<EditUser />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
