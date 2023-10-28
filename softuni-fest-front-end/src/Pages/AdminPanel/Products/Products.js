import styles from "./Products.module.css";
import { useContext, useEffect, useState } from "react";
import { ProductModal } from "../../../components/ProductModal/ProductModal";
import { createProduct, editProduct, getProductsByBusinessId } from "../../../services/requests";

// import { ProductRow } from "../../../components/productRow/ProductRow";
import { ProductRow } from "../../../components/productRow/productRow";
import { AuthContext } from "../../../contexts/AuthContext";
import { errorNotification } from "../../../util/notificationHandler";

export const Products = () => {
    const { accessData } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const [edittingIndex, setEditingIndex] = useState(null)


    const [products, setProducts] = useState([]);

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: 0,
    });

    const getProducts = async () => {
        console.log(accessData);
        if (!accessData._id) {
            return
        }
        const data = await getProductsByBusinessId(accessData._id)
        console.log(data);
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [accessData])

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const createHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await createProduct(values);
            getProducts()
            setIsOpen(false)
        } catch (err) {
            errorNotification(err.message)
        }
    };

    const editHandler = async (e, productId) => {
        e.preventDefault();
        try {
            const data = await editProduct(productId, values);
            getProducts()
            setEditingIndex(null)
        } catch (err) {
            errorNotification(err.message)

        }
    };



    return (
        <>
            <div
                className={`${styles["container"]} ${isOpen || edittingIndex ? styles["blur-background"] : ""
                    }`}
            >

                <h1>Products</h1>

                <div className={styles["create-btn"]}>

                    <button
                        onClick={() => {
                            setIsOpen(true)
                            setValues({
                                name: "",
                                description: "",
                                price: 0,
                            })
                        }
                        }>
                        Create item
                    </button>

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
                    <tbody>
                        {products.map((product, index) => (
                            <ProductRow
                                key={index}
                                product={product}
                                setEditingIndex={(productId) => {
                                    setEditingIndex(index);
                                    // Assuming `product._id` is the unique identifier for the product
                                    setValues(products[index]);
                                }}
                            />


                        ))}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <ProductModal
                    CloseModal={() => setIsOpen(false)}
                    mode="create"
                    values={values}
                    handleSubmit={createHandler}
                    onChangeHandler={onChangeHandler}
                />
            )}

            {edittingIndex !== null &&
                <ProductModal
                    CloseModal={() => setEditingIndex(null)}
                    mode="edit"
                    values={values}
                    handleSubmit={(e) => editHandler(e, products[edittingIndex]._id)}
                    onChangeHandler={onChangeHandler}
                />
            }
        </>
    );
};
