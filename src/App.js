import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import React from 'react';
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Home from './components/Home';
import NavBar from './components/NavBar'
import Table from './components/Table';
import { MyContext } from './components/Mycontext';
import { useState } from 'react';
import { useContext } from 'react';
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAUVWrMlhladefcgJqfv_d4du4F5dehSPw",
    authDomain: "alpaago-assignment-cb1d9.firebaseapp.com",
    databaseURL: "https://alpaago-assignment-cb1d9-default-rtdb.firebaseio.com",
    projectId: "alpaago-assignment-cb1d9",
    storageBucket: "alpaago-assignment-cb1d9.appspot.com",
    messagingSenderId: "1038404851074",
    appId: "1:1038404851074:web:3271d1a91fae82f6b2eb9b",
    measurementId: "G-YQN14CZXC6"
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const [uid, setUid] = useState(localStorage.getItem('username') ?? "");
  return (
    <MyContext.Provider value={{ uid, setUid }}>
    <>
    <NavBar />
   <Router>
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/table" element={<Table/>}></Route>
    </Routes>
   </Router>
   </>
   </MyContext.Provider>
  );
}

export default App;
