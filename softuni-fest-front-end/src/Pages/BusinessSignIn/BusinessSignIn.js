import styles from './BusinessSignIn.module.css';

const BusinessSignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Business Sign In</h1>
            <label>
                Email
            </label>
            <input type="email" name="email" />
            <label>
                Password
                <input type="password" name="password" />
            </label>
            <button>Sign In</button>
        </div>
    );
};

export default BusinessSignIn;