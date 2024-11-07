import React from 'react';
import './App.css';
import './normalize.css';
import { Routes, Route } from 'react-router-dom';
import Frame from "./component/main/frame";
import Login from "./component/main/login";
import Notice from "./component/notice/notice"
import Home from "./component/main/home";
import Reminiscence from "./component/reminiscence/reminiscence";
import Diet from "./component/diet/diet";
import ReturnHome from "./component/return_home/return_home";
import Medicine from "./component/medicine/medicine";
import Detail from "./component/reminiscence/detail";
import { auth } from "./firebaseConfig";
import SignUp from "./component/pages/sign_up";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/service" element={<Frame/>}>
          <Route index element={<Home/>}/>
          <Route path="notice" element={<Notice/>}/>
          <Route path="gallery" element={<Reminiscence/>}/>
          <Route path="gallery/:postId" element={<Detail/>}/>
          <Route path="diet" element={<Diet/>}/>
          <Route path="medicine" element={<Medicine/>}/>
          <Route path="returnHome" element={<ReturnHome/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
