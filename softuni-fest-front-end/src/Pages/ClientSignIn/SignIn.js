import React from 'react';
import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Sign In</h1>
            <label>
                <Link to={"/business/login"}>
                    Client Sign Up
                </Link>
            </label>
            <label>
                Email
            </label>
            <input type="email" name="email" />
            <label>
                Password
            </label>
            <input type="email" name="email" />
            <button type="submit" className={styles.fullWidth}>
                Sign Up
            </button>
        </div>
    );
};

export default SignIn;