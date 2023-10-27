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
        const data = await loginUser(credentials)
        setAccessData(data)
        localStorage.setItem('access_info', JSON.stringify(credentials));
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>

                <h1>Sign In</h1>
                <label>
                    <Link to={"/business/login"}>
                        Business Sign Up
                    </Link>
                </label>
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
        </div>
    );
};

export default SignIn;