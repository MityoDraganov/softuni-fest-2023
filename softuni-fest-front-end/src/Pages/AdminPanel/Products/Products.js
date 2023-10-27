import styles from "./Products.module.css";
import { useEffect, useState } from "react"
import { ProductModal } from "../../../components/ProductModal/ProductModal";
import { createProduct } from "../../../services/requests";


export const Products = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        
    }, [])

    const [values, setValues] = useState({
        "name": "",
        "description": "",
        "price": 0
    })

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert price to a number
        const parsedPrice = Number(values.price);
    
        // Check if parsedPrice is a valid number
        if (!isNaN(parsedPrice)) {
            // Update values with parsedPrice
            setValues(prevValues => ({ ...prevValues, price: parsedPrice }));
    
            // Submit the form
            const data = await createProduct({ ...values, price: parsedPrice });
            console.log(data);
        } else {
            console.error('Invalid price value. Please enter a valid number.');
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

            {isOpen && <ProductModal setIsOpen={setIsOpen} values={values} handleSubmit={handleSubmit} onChangeHandler={onChangeHandler}/>}
        </>
    );
};
