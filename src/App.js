import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import HomepageStatic from './pages/HomepageStatic'
import Drivers from './pages/Drivers';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomepageStatic />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
    </Router>
  );
}

export default App;
