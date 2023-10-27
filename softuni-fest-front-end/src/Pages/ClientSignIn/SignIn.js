import React from 'react';
import styles from './SignIn.module.css';

const SignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Sign In</h1>
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