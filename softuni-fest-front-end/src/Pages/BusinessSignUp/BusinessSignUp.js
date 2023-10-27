import styles from './BusinessSignUp.module.css';

const BusinessSignUp = () => {
  return (
    <div className={styles.container}>
      <h1>Business Sign Up</h1>

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
        
        <label>
          Re-enter Password:
          <input type="password" name="rePassword" />
        </label>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default BusinessSignUp;