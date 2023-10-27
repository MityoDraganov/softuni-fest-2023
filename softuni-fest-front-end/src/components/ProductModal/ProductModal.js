
import styles from "./ProductModal.module.css"
import { useState } from "react"
import { createProduct } from "../../services/requests"

export const ProductModal = ({ setIsOpen }) => {

    const [values, setValues] = useState({
        "name": "",
        "description": "",
        "price": 0
    })

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }





    const handleCreateProduct = (e) => {
        e.preventDefault()

        const data = createProduct(values)

        console.log(data);
    }

    return (

        <div className={styles["add-product-modal"]}>
            <h1>
                Create product
            </h1>

            <form className={styles["product-form"]} onSubmit={handleCreateProduct}>
                <div>
                    <label>Name</label>
                    <input
                        name="name"
                        onChange={onChangeHandler}
                        value={values.name}
                    />
                </div>
                <div>
                    <label name="description">Description</label>
                    <textarea
                        name="description"
                        onChange={onChangeHandler}
                        value={values.description}
                    />
                </div>
                <div>
                    <label name="price">Price</label>
                    <input
                        name="price"
                        type="text"
                        onChange={onChangeHandler}
                        value={values.price}
                    />

                </div>

                <div className={styles["modal-actions"]}>
                    <button type="button" onClick={() => setIsOpen(false)} className={styles["action-deny"]}>Close</button>
                    <button type="submit">Create</button>
                </div>
            </form>

        </div>
    )
}