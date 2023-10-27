
import './App.css';
import { Routes, Route, } from "react-router-dom"

import { Navigation } from './components/Navigation/Navigation';

//user imports

//business imports
import { Products } from './Pages/AdminPanel/Products/Products';
import SignUp from './Pages/ClientSignUp/SignUp';
import SignIn from './Pages/ClientSignIn/SignIn';
import BusinessSignUp from './Pages/BusinessSignUp/BusinessSignUp';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/HomePage/HomePage';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navigation />
        <Routes>
          <Route path="/users/register" element={<SignUp />} />
          <Route path="/users/login" element={<SignIn />} />
          <Route path="/" element={<Home />} />

          <Route path="/business/register" element={<BusinessSignUp />} />

          <Route path="/business/products" element={<Products />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
