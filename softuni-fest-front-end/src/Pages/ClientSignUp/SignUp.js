import React from 'react';
import styles from './SignUp.module.css';

const SignUp = () => {
    return (
        <div className={styles.container}>
            <h1>Sign Up</h1>

            <form>
                <label>
                    First Name:
                    <input type="text" name="firstName" />
                </label>

                <label>
                    Last Name:
                    <input type="text" name="lastName" />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" />
                </label>

                <label>
                    Re-enter Password:
                    <input type="password" name="rePassword" />
                </label>

                <div className={styles.terms}>
                    <label>
                        <input type="checkbox" name="terms" />
                    </label>
                    <span>I agree to the terms and privacy policy</span>
                </div>
                <button type="submit" className={styles.fullWidth}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;