import { NavLink } from "react-router-dom"
import styles from "./Navigation.module.css"
export const Navigation = () => {

    // business nav
    return (
        <nav className={styles["container"]}>
            <ul>
                <li>
                    <NavLink to="/bussiness/register" activeClassName={styles["active"]}>
                        Register
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bussiness/login" activeClassName={styles["active"]}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bussiness/products" activeClassName={styles["active"]}>
                        Products
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
