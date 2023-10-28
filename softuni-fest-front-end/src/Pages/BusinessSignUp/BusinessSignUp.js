import { Link, useNavigate } from 'react-router-dom';
import styles from './BusinessSignUp.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { registerBusiness } from '../../services/requests';
import { errorNotification, successNotification } from '../../util/notificationHandler';

const BusinessSignUp = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ companyName: "", email: "", password: "", rePassword: "" });
  const { setAccessData } = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (credentials.password !== credentials.rePassword) {
        throw new Error("Passwords do not match")
      }
      const response = await registerBusiness(credentials)
      setAccessData(response)
      successNotification("Registration Successful")
      localStorage.setItem('access_info', JSON.stringify(response));
      navigate("/business/products")
    } catch (err) {
      errorNotification(err.message)
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Business Sign Up</h1>
        <div className={styles.flex}>
          <div style={{ "marginRight": "25px" }}>
            <label>
              Company Name
            </label>
            <input type="text" name="company" value={credentials.companyName} onChange={(e) => setCredentials(state => ({ ...state, companyName: e.target.value }))} className={styles.input} />
          </div>
          <div>
            <label>
              Email
            </label>
            <input type="email" name="email" value={credentials.email} onChange={(e) => setCredentials(state => ({ ...state, email: e.target.value }))} className={styles.input} />
          </div>
        </div>

        <label>
          Password
          <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials(state => ({ ...state, password: e.target.value }))} />
        </label>

        <label>
          Re-enter Password
          <input type="password" name="rePassword" value={credentials.rePassword} onChange={(e) => setCredentials(state => ({ ...state, rePassword: e.target.value }))} />
        </label>
        <div className={styles.submit}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <label>
        <Link to={"/users/register"} className={styles.label_business}>
          Sign Up As Client
        </Link>
      </label>
    </div>
  );
};

export default BusinessSignUp;