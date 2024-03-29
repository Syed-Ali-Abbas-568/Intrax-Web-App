import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Login from './pages/login/Login';
import HomepageStatic from './pages/HomepageStatic'
import Drivers from './pages/Drivers';
import Buses from './pages/Buses'
import { Toaster } from 'react-hot-toast';
//import Homepage from './pages/Homepage';

import axios from 'axios';


axios.defaults.withCredentials = true;


function App() {


  const { user } = useAuthContext()



  return (
    <><Toaster position='bottom-right' defaults={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login"
            element={user ? <Navigate to='/homepage' /> : <Login />} />
          <Route path="/homepage"
            element={user ? <HomepageStatic /> : <Navigate to='/login' />} />
          <Route path="/drivers"
            element={user ? <Drivers /> : <Navigate to='/login' />} />
          <Route path="/buses"
            element={user ? <Buses /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
