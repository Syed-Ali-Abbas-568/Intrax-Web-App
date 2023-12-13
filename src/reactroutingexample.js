import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route,Routes,Link } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login/Login';
import HomepageStatic from './Pages/HomepageStatic';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Homepage">About</Link>
            </li>
          </ul>
        </nav>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
