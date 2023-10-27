import styles from './BusinessSignIn.module.css';

const BusinessSignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Business Sign In</h1>
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
                <input type="password" name="password" />
            </label>
            <button>Sign In</button>
        </div>
    );
};

export default BusinessSignIn;