import styles from "./Products.module.css";
import { useEffect, useState } from "react"
import { ProductModal } from "../../../components/ProductModal/ProductModal";
export const Products = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        
    }, [])


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

            {isOpen && <ProductModal setIsOpen={setIsOpen} />}
        </>
    );
};
