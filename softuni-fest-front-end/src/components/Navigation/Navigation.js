import { NavLink } from "react-router-dom"
import styles from "./Navigation.module.css"
export const Navigation = () => {

    // business nav
    return (
        <nav className={styles["container"]}>
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
        </nav>
    )
}
