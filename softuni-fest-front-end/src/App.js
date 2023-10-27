
import './App.css';
import {Routes, Route, } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>

        //user routes
        <Route path="/users/register" element={} />
        <Route path="/users/login" element={} />

        //bussiness routes
        <Route path="/bussiness/login" element={} />
        <Route path="/bussiness/register" element={} />

        <Route path="/bussiness/products" element={} />
      </Routes>
    </>
  );
}

export default App;
