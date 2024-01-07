import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './pages/Homepage';
import Login from './pages/login/Login';
import HomepageStatic from './pages/HomepageStatic';

function App() {
  return (
    <>
      <Homepage></Homepage>
    </>
  );
}

export default App;
