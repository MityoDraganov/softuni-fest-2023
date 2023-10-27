import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = () => {
    const { pathname } = useLocation();

    const isActive = (path) => {
        return path === pathname ? styles.active : "";
    };

    return (
        <nav className={styles.container}>
            <ul>
                <li className={isActive("/business/register")}>
                    <Link to="/business/register">Register</Link>
                </li>
                <li className={isActive("/business/login")}>
                    <Link to="/business/login">Login</Link>
                </li>
                <li className={isActive("/business/products")}>
                    <Link to="/business/products">Products</Link>
                </li>
            </ul>

            <div>
                <div className={styles["pfp-container"]}>
                    <img className={styles["pfp"]} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" />
                </div>
            </div>
        </nav>
    );
};
