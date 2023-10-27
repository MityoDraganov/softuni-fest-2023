import styles from './BusinessSignIn.module.css';

const BusinessSignIn = () => {
    return (
        <div className={styles.container}>
            <h1>Business Sign In</h1>

            <form>
                <label>
                    Company Name:
                    <input type="text" name="company" />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" />
                </label>

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default BusinessSignIn;