
import './App.css';
import { Routes, Route, } from "react-router-dom"

import { Navigation } from './components/Navigation/Navigation';

//user imports
import { Shop } from './Pages/UI/Shop/Shop';
import SignUp from './Pages/ClientSignUp/SignUp';
import SignIn from './Pages/ClientSignIn/SignIn';

//business imports
import { Products } from './Pages/AdminPanel/Products/Products';
import BusinessSignUp from './Pages/BusinessSignUp/BusinessSignUp';


import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/HomePage/HomePage';
import { RouteGuard } from './util/RouteGuard';
import 'react-toastify/dist/ReactToastify.css'
import LearnMore from './Pages/LearnMore/LearnMore';
import PrivateRoute from './util/RoutePrivate';
import PaymentSuccessful from './Pages/PaymentSuccessful/PaymentSuccessful';
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
          <Route path="/users/register" element={<PrivateRoute component={SignUp} />} />
          <Route path="/users/login" element={<PrivateRoute component={SignIn} />} />
          <Route path="/users/shop" element={<Shop />} />
          <Route path="/users/shop/:id" element={<Shop />} />

          <Route path="/" element={<Home />} />
          <Route path="/business/register" element={<PrivateRoute component={BusinessSignUp} />} />
          <Route path="/business/products" element={<RouteGuard component={Products} />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/payment-successful" element={<PaymentSuccessful />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
