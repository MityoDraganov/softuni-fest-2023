
import styles from "./Shop.module.css"

import { Search } from "../../../components/Search/Search"
import { getAllProducts, getProductById } from "../../../services/requests"
import { useEffect, useState } from "react"

import { Product } from "../../../components/Product/Product"
import { ShopModal } from "../../../components/ShopModal/ShopModal"
import { useParams } from "react-router-dom"

export const Shop = () => {
    const { id } = useParams()
    const [selectedProduct, setSelectedProduct] = useState({
        name: "",
        price: 0,
        description: "",
        owner: {
            companyName: ""
        }
    })

    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const onChangeHandler = (e) => {
        const inputValue = e.target.value.toLowerCase(); // Convert the input to lowercase
        setSearchValue(inputValue);
    
        // Filter products based on the lowercase input value
        setFilteredProducts(products.filter((product) => {
            return product.owner.companyName.toLowerCase().includes(inputValue);
        }));
    };

    const getProducts = async () => {
        const data = await getAllProducts()
        console.log(data);
        setProducts(data)
    }

    const getProductByIdFunc = async (id) => {
        if (id) {
            const data = await getProductById(id)
            console.log(data);
            setSelectedProduct(data)
            // to do remove the product id from the url
        }
    }

    useEffect(() => {
        getProductByIdFunc(id)
        getProducts()
    }, [id])

    return (
        <div className={`${styles["container"]} ${selectedProduct.name !== "" ? styles["blur-background"] : ""}`}>
            <div className={styles["search-container"]}>
                <h2>Search</h2>
                <Search
                    onInputChange={onChangeHandler}
                    searchValue={searchValue}
                />

            </div>

            <div className={styles["products-container"]}>
                {searchValue !== "" ? (
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                                openModal={() => setSelectedProduct(product)}
                                selectedProduct={selectedProduct}
                            />
                        ))
                    ) : (
                        <p style={{"textAlign" : "center"}}>No products found</p>
                    )
                ) : (
                    products.length > 0 ? (
                        products.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                                openModal={() => setSelectedProduct(product)}
                                selectedProduct={selectedProduct}
                            />
                        ))
                    ) : (
                        <p style={{"textAlign" : "center"}}>No products found</p>
                    )
                )}
            </div>

            {selectedProduct.name !== "" && (
                <ShopModal
                    product={selectedProduct}
                    closeModal={() => setSelectedProduct({
                        "name": "",
                        "price": 0,
                        "description": ""
                    })}
                    
                />
            )}
        </div>
    )
}