
import './App.css';
import { Routes, Route, } from "react-router-dom"

import { Navigation } from './components/Navigation/Navigation';

//user imports

//bussiness imports
import { Products } from './Pages/AdminPanel/Products';
import SignUp from './Pages/ClientSignUp/SignUp';


function App() {
  return (
    <>
      <Navigation />
      <Routes>

        //user routes
        <Route path="/users/register" element={<SignUp />} />
        {/* //<Route path="/users/login" element={} />

        //bussiness routes
        //<Route path="/bussiness/login" element={} />
        //<Route path="/bussiness/register" element={} /> */}

        <Route path="/bussiness/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
