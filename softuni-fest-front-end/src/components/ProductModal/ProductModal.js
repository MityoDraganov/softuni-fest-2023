
import styles from "./ProductModal.module.css"
import { useState } from "react"

export const ProductModal = ({ setIsOpen }) => {

    const [values, setValues] = useState({
        "name": "",
        "description": "",
        "price": ""
    })

    const handleCreateProduct= (e) => {
        e.preventDefault()


    }

    return (

        <div className={styles["add-product-modal"]}>
            <h1>
                Create product
            </h1>

            <form className={styles["product-form"]} onSubmit={handleCreateProduct}>
                <div>
                    <label>Name</label>
                    <input name="name"/>
                </div>
                <div>
                    <label name="description">Description</label>
                    <textarea name="description"/>
                </div>
                <div>
                    <label name="price">Price</label>
                    <input name="price" type="number" />
                </div>

                <div className={styles["modal-actions"]}>
                    <button type="button" onClick={() => setIsOpen(false)} className={styles["action-deny"]}>Close</button>
                    <button type="submit">Create</button>
                </div>
            </form>

        </div>
    )
}