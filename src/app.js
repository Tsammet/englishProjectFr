import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './user/register';
import Login from './user/login';
import Navbar from './navbar';

function App() {

    return (
        <>
            <Navbar />
            <div>

                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </>
    )
}

export default App;