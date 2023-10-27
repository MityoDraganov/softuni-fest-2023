
import './App.css';
import { Routes, Route, } from "react-router-dom"

import { Navigation } from './components/Navigation/Navigation';

//user imports

//business imports
import { Products } from './Pages/AdminPanel/Products';
import SignUp from './Pages/ClientSignUp/SignUp';
import SignIn from './Pages/ClientSignIn/SignIn';
import BusinessSignIn from './Pages/BusinessSignIn/BusinessSignIn';
import BusinessSignUp from './Pages/BusinessSignUp/BusinessSignUp';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/users/register" element={<SignUp />} />
        {/* //<Route path="/users/login" element={} />

        //bussiness routes
        //<Route path="/bussiness/login" element={} />
        //<Route path="/bussiness/register" element={} /> */}

        <Route path="/business/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
