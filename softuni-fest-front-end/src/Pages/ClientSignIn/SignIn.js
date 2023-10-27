import React, { useContext, useState } from 'react';
import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/requests';
import { AuthContext } from '../../contexts/AuthContext';

const SignIn = () => {
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", rePassword: "" });
    const { setAccessData } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

        
        const data = await loginUser(credentials)
        setAccessData(data)
        localStorage.setItem('access_info', JSON.stringify(data));
        } catch(err){
            console.error(err)
        }
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <h1>Sign In</h1>
                <label>
                    Email
                </label>
                <input type="email" name="email"  value={credentials.email} onChange={(e) => setCredentials(state => ({...state, email: e.target.value}))}/>
                <label>
                    Password
                </label>
                <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials(state => ({...state, password: e.target.value}))}/>
                <button type="submit" className={styles.fullWidth}>
                    Sign Up
                </button>
            </form>
            <label>
                <Link to={"/business/register"} className={styles.label_business}>
                    Business Sign In
                </Link>
            </label>
        </div>
    );
};

export default SignIn;