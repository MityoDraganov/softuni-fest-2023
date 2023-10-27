import { Link } from 'react-router-dom';
import styles from './BusinessSignIn.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { loginBusiness } from '../../services/requests';

const BusinessSignIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { setAccessData } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await loginBusiness(credentials)
        setAccessData(data)
        localStorage.setItem('access_info', JSON.stringify(data));
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Business Sign In</h1>
                <label>
                    <Link to={"/users/login"}>
                        Client Sign In
                    </Link>
                </label>
                <label>
                    Email
                </label>
                <input type="email" name="email" value={credentials.email} onChange={(e) => setCredentials(state => ({ ...state, email: e.target.value }))} />
                <label>
                    Password
                    <input type="password" name="password" value={credentials.password} onChange={(e) => setCredentials(state => ({ ...state, password: e.target.value }))} />
                </label>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
};

export default BusinessSignIn;