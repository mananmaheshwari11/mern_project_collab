import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Today from './pages/Today';
import ScheduledLater from './pages/ScheduledLater';
import Missed from './pages/Missed';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Side Navigation Bar */}
        <nav className="side-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/today">Today</Link>
            </li>
            <li>
              <Link to="/scheduled-later">Scheduled Later</Link>
            </li>
            <li>
              <Link to="/missed">Missed</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/today" element={<Today />} />
            <Route path="/scheduled-later" element={<ScheduledLater />} />
            <Route path="/missed" element={<Missed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
