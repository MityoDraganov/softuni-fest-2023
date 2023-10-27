
import './App.css';
import { Routes, Route, } from "react-router-dom"

import { Navigation } from './components/Navigation/Navigation';

//user imports

//business imports
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

        //business routes
        //<Route path="/business/login" element={} />
        //<Route path="/business/register" element={} /> */}

        <Route path="/business/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
