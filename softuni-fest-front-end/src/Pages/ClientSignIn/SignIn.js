import React, { useContext, useState } from 'react';
import styles from './SignIn.module.css';
import { loginUser } from '../../services/requests';
import { AuthContext } from '../../contexts/AuthContext';
import { errorNotification, successNotification } from '../../util/notificationHandler';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", rePassword: "" });
    const { setAccessData } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (credentials.email === "" || credentials.password === "") throw new Error("Please fill all fields")
            const response = await loginUser(credentials)
            setAccessData(response)
            successNotification("Login Successful")
            localStorage.setItem('access_info', JSON.stringify(response));
            navigate('/')
        } catch (err) {
            errorNotification(err.message)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <label>
                    Email
                </label>
                <input type="email" name="email" value={credentials.email} onChange={(e) => setCredentials(state => ({ ...state, email: e.target.value }))} />
                <label>
                    Password
                </label>
                <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials(state => ({ ...state, password: e.target.value }))} />
                <button type="submit" className={styles.fullWidth} >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;