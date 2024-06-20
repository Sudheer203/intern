import React from "react";
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import DashBoard from "./Component/DashBoard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./Component/UserProfile";
import Updateprofile from "./Component/Updateprofile";
const App : React.FC = () =>{
  return(
    <div className="">
      <Router>
        <Routes>
         <Route path="/" element={<Navbar/>} />
         <Route path="/dash" element={<DashBoard/>} />
         <Route path="/profile" element={<UserProfile/>} />
         <Route path="/update/:id" element={<Updateprofile/>} />





        </Routes>
        <ToastContainer/>
      </Router>

    </div>
  )
}


export default App