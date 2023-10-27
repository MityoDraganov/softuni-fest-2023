import styles from "./Products.module.css";
import {useState} from "react"
export const Products = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleCreateItem = () => {

    }

    return (
        <div className={styles["container"]}>
            <h1>Products</h1>
            <div className={styles["create-btn"]}>
                <button>Create item</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};
