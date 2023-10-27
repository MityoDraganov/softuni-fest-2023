import React from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className={styles.container}>
            <h1>Sign Up</h1>
            <label>
                <Link to={"/business/register"}>
                    Client Sign Up
                </Link>
            </label>
            <div className={styles.flex}>
                <div className={styles.company}>
                    <label>
                        First Name
                    </label>
                    <input type="text" name="firstname" />
                </div>
                <div className={styles.name}>
                    <label>
                        Last Name
                    </label>
                    <input type="text" name="lastname" />
                </div>
            </div>

            <label>
                Email
                <input type="email" name="email" />
            </label>
            <label>
                Password
                <input type="password" name="password" />
            </label>

            <label>
                Re-enter Password
                <input type="password" name="rePassword" />
            </label>
            <button type="submit" className={styles.fullWidth}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;