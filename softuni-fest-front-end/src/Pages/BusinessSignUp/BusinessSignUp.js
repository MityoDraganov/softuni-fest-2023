import { Link } from 'react-router-dom';
import styles from './BusinessSignUp.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { registerBusiness } from '../../services/requests';

const BusinessSignUp = () => {
  const [credentials, setCredentials] = useState({ companyName: "", email: "", password: "", rePassword: "" });
  const { setAccessData } = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await registerBusiness(credentials)
    setAccessData(data)
    localStorage.setItem('access_info', JSON.stringify(data));
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Business Sign Up</h1>
        <label>
          <Link to={"/users/register"}>
            Client Sign Up
          </Link>
        </label>
        <div className={styles.flex}>
          <div className={styles.company}>
            <label>
              Company Name
            </label>
            <input type="text" name="company" value={credentials.companyName} onChange={(e)=> setCredentials(state => ({...state, companyName: e.target.value}))}/>
          </div>
          <div className={styles.email}>
            <label>
              Email
            </label>
            <input type="email" name="email" value={credentials.email} onChange={(e)=> setCredentials(state => ({...state, email: e.target.value}))}/>
          </div>
        </div>

        <label>
          Password
          <input type="password" name="password" value={credentials.password} onChange={(e)=> setCredentials(state => ({...state, password: e.target.value}))}/>
        </label>

        <label>
          Re-enter Password
          <input type="password" name="rePassword" value={credentials.rePassword} onChange={(e)=> setCredentials(state => ({...state, rePassword: e.target.value}))}/>
        </label>
        <div className={styles.submit}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSignUp;