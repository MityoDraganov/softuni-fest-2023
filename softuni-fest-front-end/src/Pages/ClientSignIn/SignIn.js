import React from 'react';
import styles from './SignIn.module.css';

const SignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Sign In</h1>

            <form>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit" className={styles.fullWidth}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignIn;