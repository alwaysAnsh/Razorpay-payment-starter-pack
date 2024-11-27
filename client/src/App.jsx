import React, { useState } from "react";
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Home } from "./components/Home";
import PayPal from "./components/PayPal";
import QRcode from "./components/QRcode";
import { Razorpay } from "./components/Razorpay";

// Renders errors or successfull transactions on the screen.


function App() {
    

    return (
        <div className="App">
            <Routes>
                <Route path = '/' element = {<Home/>} />
                <Route path = '/paypal' element = {<PayPal/>} />
                <Route path = '/qr-code' element = {<QRcode/>} />
                <Route path = '/razorpay' element = {<Razorpay/>} />
            </Routes>
        </div>
    );
}

export default App;