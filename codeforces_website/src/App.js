import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/welcome';
import Login from './pages/login';
import HomePage from './pages/home';
import SignUp from './pages/signup';
import ComparePage from './pages/compare';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />  {/* Root route */}
        <Route path="/login" element={<Login />} />  {/* Login page */}
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
};

export default App;
