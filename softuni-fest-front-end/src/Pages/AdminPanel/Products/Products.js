import styles from "./Products.module.css";
import { useEffect, useState } from "react"
import { ProductModal } from "../../../components/ProductModal/ProductModal";
import { createProduct } from "../../../services/requests";

import {toast} from "react-toastify"

export const Products = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState([])


    const [values, setValues] = useState({
        name: "",
        description: "",
        price: 0
    })

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }





    const createHandler = async (e) => {
        e.preventDefault()

        try{

            console.log("clicked");
            const data = await createProduct(values)
        } catch (err){
            toast(err)
        }
    }

    return (
        <>
            <div className={`${styles["container"]} ${isOpen ? styles["blur-background"] : ""}`}>
                <h1>Products</h1>

                <div className={styles["create-btn"]}>
                    {!isOpen
                        &&
                        <button onClick={() => setIsOpen(true)}>Create item</button>
                    }
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

            {isOpen && <ProductModal setIsOpen={setIsOpen} values={values} handleSubmit={createHandler} onChangeHandler={onChangeHandler}/>}
        </>
    );
};
