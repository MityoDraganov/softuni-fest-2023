

import styles from "./Products.module.css"

export const Products = () => {


    return (
        <>
            <h1>Products</h1>
            <div className={styles["create-btn"]}>
                <button>Create item</button>
            </div>
        </>
    )
}