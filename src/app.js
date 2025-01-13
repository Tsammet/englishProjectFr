import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Register from './user/register';
import Home from './home/home';
import Login from './user/login';
import Navbar from './navbar';
import LogOut from './user/logout';
import WordGame from './game/wordGame';
import Profile from './user/profile';

function App() {

    return (
        <>
            <Navbar />

            <div>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<LogOut /> } />

                    {/* Rutas Privadas*/}
                    <Route path='/home' element={<PrivateRoute> <Home /> </PrivateRoute>} />
                    <Route path='/profile' element={<PrivateRoute> <Profile /> </PrivateRoute>} />
                    <Route path='/wordGame' element={<PrivateRoute> <WordGame /> </PrivateRoute>} />
                </Routes>
            </div>
        </>
    )
}

export default App;