import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Login from './pages/login/Login';
import HomepageStatic from './pages/HomepageStatic'
import Drivers from './pages/Drivers';
import Buses from './pages/Buses'
import Stations from './pages/Stations'
import { Toaster } from 'react-hot-toast';


import axios from 'axios';
import RoutePage from './pages/routePage/RoutePage';


import GoogleMapsContext from './context/GoogleMapContext';
import { GoogleMapsProvider } from './context/GoogleMapContext';


axios.defaults.withCredentials = true;


function App() {


  const { user } = useAuthContext()



  return (
    <GoogleMapsProvider googleMapsApiKey="AIzaSyA7T9I0EHBQ8jG9pjTAofdTlI52EGdSt4c">
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
            <Route path="/routes"
              element={<RoutePage />} />
            <Route path="/buses"
              element={user ? <Buses /> : <Navigate to='/login' />} />
            <Route path="/stations"
              element={<Stations />} />
          </Routes>
        </Router>

      </>
    </GoogleMapsProvider>
  );
}

export default App;
