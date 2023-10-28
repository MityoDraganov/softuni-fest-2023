import React, { useContext, useState } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { registerUser } from '../../services/requests';
const SignUp = () => {
    const { setAccessData } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", rePassword: "" });
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)
        const response = await registerUser(credentials)
        console.log(response.ok)
        setAccessData(response)
        localStorage.setItem('access_info', JSON.stringify(response));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className={styles.flex}>
                    <div style={{"marginRight" : "25px"}}>
                        <label>
                            First Name
                        </label>
                        <input type="text" name="firstname" value={credentials.firstName} onChange={(e) => setCredentials(state => ({ ...state, firstName: e.target.value }))}
                            required
                            minLength={3}
                            maxLength={20}
                            pattern="[a-zA-Z]+"
                            title="Only letters are allowed"
                            size={20}
                            className={styles.input} />
                    </div>
                    <div>
                        <label>
                            Last Name
                        </label>
                        <input type="text" name="lastname" value={credentials.lastName} onChange={(e) => setCredentials(state => ({ ...state, lastName: e.target.value }))}
                            required
                            minLength={3}
                            maxLength={20}
                            pattern="[a-zA-Z]+"
                            title="Only letters are allowed"
                            size={20}
                            className={styles.input} />
                    </div>
                </div>

                <label>
                    Email
                    <input type="email" name="email" value={credentials.email} onChange={(e) => setCredentials(state => ({ ...state, email: e.target.value }))} />
                </label>
                <label>
                    Password
                    <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials(state => ({ ...state, password: e.target.value }))} />
                </label>

                <label>
                    Re-enter Password
                    <input type="password" name="rePassword" value={credentials.rePassword} onChange={(e) => setCredentials(state => ({ ...state, rePassword: e.target.value }))} />
                </label>
                <button type="submit" className={styles.fullWidth}>
                    Sign Up
                </button>
            </form>
            <label>
                <Link to={"/business/register"} className={styles.label_business}>
                    Sign Up As Business
                </Link>
            </label>
        </div>
    );
};

export default SignUp;