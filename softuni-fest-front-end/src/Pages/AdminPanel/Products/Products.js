import styles from "./Products.module.css";
import { useContext, useEffect, useState, useCallback } from "react";
import { ProductModal } from "../../../components/ProductModal/ProductModal";
import { createProduct, deleteProduct, editProduct, getProductsByBusinessId } from "../../../services/requests";
import { AuthContext } from "../../../contexts/AuthContext";
import { errorNotification } from "../../../util/notificationHandler";
import { ProductRow } from "../../../components/ProductRow/ProductRow";

export const Products = () => {
    const { accessData } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const [edittingIndex, setEditingIndex] = useState(null)


    const [products, setProducts] = useState([]);

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: 0,
        subscription: false
    });



    const getProducts = useCallback(async () => {
        if (!accessData._id) {
            return;
        }
    
        try {
            const data = await getProductsByBusinessId(accessData._id);
            const updatedData = data.map(product => ({
                ...product,
                subscription: product.priceId !== null
            }));
            console.log(updatedData);
            setProducts(updatedData);
        } catch (error) {
            console.error(error);
        }
    }, [accessData]);

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const toggleHandler = () => {
        setValues((state) => ({ ...state, subscription: !state.subscription }));
    };
    

    const createHandler = async (e) => {
        e.preventDefault();
    
        try {
            console.log(values.subscription);
            const parsedPrice = parseFloat(values.price);
            const data = await createProduct({ ...values, price: parsedPrice });
            setProducts((state) => [...state, data])
            setIsOpen(false)
        } catch (err) {
            errorNotification(err.message)
        }
    };
    

    const editHandler = async (e, productId) => {
        e.preventDefault();
    
        try {
            const parsedPrice = parseFloat(values.price);
            const editedProduct = await editProduct(productId, {...values, price: parsedPrice});
            console.log(editedProduct);
    
            if ('priceId' in editedProduct && editedProduct.priceId !== null) {
                editedProduct.subscription = true;
            }
    
            setProducts((state) => {
                const newState = [...state]
                newState[edittingIndex] = editedProduct
                return newState
            })
            setEditingIndex(null)
        } catch (err) {
            errorNotification(err.message)
            console.log(err);
        }
    };

    const handleDeleteClick = (e, productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            deleteHandler(e, productId);
            setProducts((state) => state.filter((product) => product._id !== productId));
        }
    };

    const deleteHandler = async (e, productId) => {
        e.preventDefault()

        try {
            await deleteProduct(productId)
            getProducts()
        } catch (err) {
            errorNotification(err.message)
        }
    }



    return (
        <>
            <div
                className={`${styles["container"]} ${isOpen || edittingIndex !== null ? styles["blur-background"] : ""}`}
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
                                subscription: false
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
                                setEditingIndex={() => {
                                    setEditingIndex(index);

                                    setValues(products[index]);
                                }}
                                deleteHandler={(e) => handleDeleteClick(e, product._id)}
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
                toggleHandler={toggleHandler}
                isSubscription={values.subscription}
            />
            
            )}

            {edittingIndex !== null &&
                <ProductModal
                    CloseModal={() => setEditingIndex(null)}
                    mode="edit"
                    values={values}
                    handleSubmit={(e) => editHandler(e, products[edittingIndex]._id)}
                    onChangeHandler={onChangeHandler}
                    toggleHandler={toggleHandler}
                    isSubscription={values.subscription}
                />
            }
        </>
    );
};
