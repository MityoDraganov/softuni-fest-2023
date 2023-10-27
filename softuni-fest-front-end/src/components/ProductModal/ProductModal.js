
import styles from "./ProductModal.module.css"
import { useState } from "react"




export const ProductModal = ({ CloseModal, mode, onChangeHandler, values, handleSubmit }) => {




    return (

        <div className={styles["add-product-modal"]}>
            <h1>
                {mode == "create" ? "Create product" : "Edit product"}
            </h1>

            <form className={styles["product-form"]} onSubmit={handleSubmit}>
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
                    <button type="button" onClick={CloseModal} className={styles["action-deny"]}>Close</button>
                    {mode == "create"
                        ?
                        <button type="submit">Create</button>
                        :
                        <button type="submit" >Edit</button>
                    }
                </div>
            </form>

        </div>
    )
}