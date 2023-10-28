// Home.js

import{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './HomePage.module.css';

export default function Home() {

const {accessData} = useContext(AuthContext)

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1>Payment Service</h1>
            </header>

            <section className={styles.section}>
                <h2>Welcome to SoftUni Software Fest 2023!</h2>
                <p>Discover the easiest way to manage your payments.</p>

                <div className={styles.buttons}>
                    {!accessData.accessToken &&
                    <Link to="/users/register" className={styles.link}>
                        <button className={styles.button}>Sign Up</button>
                    </Link>
                    }
                    <Link to="/learn-more" className={styles.link}>
                        <button className={styles.button}>Learn More</button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
