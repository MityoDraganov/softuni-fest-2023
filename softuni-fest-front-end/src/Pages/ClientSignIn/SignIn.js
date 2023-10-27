import React from 'react';
import styles from './SignIn.module.css';

const SignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Sign In</h1>

            <div className={styles.flex}>
                <div className={styles.company}>
                    <label>
                        Company Name
                    </label>
                    <input type="text" name="company" />
                </div>
                <div className={styles.email}>
                    <label>
                        Email
                    </label>
                    <input type="email" name="email" />
                </div>
            </div>
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