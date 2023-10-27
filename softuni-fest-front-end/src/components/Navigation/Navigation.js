import { Link } from "react-router-dom"
import styles from "./Navigation.module.css"
export const Navigation = () => {

    //bussiness nav
    return (
        <nav className={styles["container"]}>
            <ul>
                <li>
                    <Link to="/bussiness/register">
                        Register
                    </Link>
                </li>
                <li>
                    <Link to="/bussiness/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/bussiness/products">
                        Products
                    </Link>
                </li>
            </ul>
        </nav >
    )
}