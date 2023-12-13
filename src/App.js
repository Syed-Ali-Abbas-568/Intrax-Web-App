import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login/Login';
import HomepageStatic from './Pages/HomepageStatic';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
    </Router>
  );
}

export default App;
