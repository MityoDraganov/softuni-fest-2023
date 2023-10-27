import { Link } from 'react-router-dom';
import styles from './BusinessSignUp.module.css';

const BusinessSignUp = () => {
  return (
    <div className={styles.container}>
      <h1>Business Sign Up</h1>
      <label>
        <Link to={"/users/register"}>
          Client Sign Up
        </Link>
      </label>
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

      <label>
        Re-enter Password
        <input type="password" name="rePassword" />
      </label>
      <div className={styles.submit}>
        <button type="submit">Sign Up</button>
      </div>
    </div>
  );
};

export default BusinessSignUp;