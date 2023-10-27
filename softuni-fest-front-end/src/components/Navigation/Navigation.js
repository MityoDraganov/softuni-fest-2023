import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

//contexts
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./Navigation.module.css";

export const Navigation = () => {
    const { setAccessData } = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault()
        setAccessData({ isBusiness: false })
        localStorage.removeItem('access_info')
    }

    const { pathname } = useLocation();

    const { accessData } = useContext(AuthContext)


    const isActive = (path) => {
        return path === pathname ? styles.active : "";
    };

    return (
        accessData.isBusiness ? (
            <nav className={styles.container}>
                <ul>
                    <li className={isActive("/business/products")}>
                        <Link to="/business/products">Products</Link>
                    </li>
                </ul>

                <ul className={styles["nav-auth"]}>

                    <li>
                        <a onClick={handleLogout} href="/">Logout</a>
                    </li>
                    {/* <div>
                    <div className={styles["pfp-container"]}>
                        <img className={styles["pfp"]} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" />
                    </div>
                </div> */}
                </ul>
            </nav>
        ) : (
            <nav className={styles.container}>

                <ul >
                    <li className={isActive("/")}>
                        <Link to="/">Home</Link>
                    </li>
                    {/* <li className={isActive("/users/products")}>
                        <Link to="/users/products">Products</Link>
                    </li> */}
                </ul>


                <ul className={styles["nav-auth"]}>
                    <li className={isActive("/users/register")}>
                        <Link to="/users/register">Register</Link>
                    </li>
                    <li className={isActive("/users/login")}>
                        <Link to="/users/login">Login</Link>
                    </li>
                    {/* <div>
                    <div className={styles["pfp-container"]}>
                        <img className={styles["pfp"]} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" />
                    </div>
                </div> */}
                </ul>
            </nav>
        )
    );
};
