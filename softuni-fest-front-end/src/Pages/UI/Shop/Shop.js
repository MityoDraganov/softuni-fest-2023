
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
        description: ""
    })

    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
        setFilteredProducts(products.filter((product) => {
            return product.owner.companyName.toLowerCase().includes(searchValue.toLowerCase());
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
        <div className={styles["container"]}>
            <div className={styles["search-container"]}>
                <h2>Search</h2>
                <Search
                    onInputChange={onChangeHandler}
                    searchValue={searchValue}
                />
                {/* <ul>
                    {searchValue && filteredProducts.map((product, index) => (
                        searchValue !== product.name &&
                        <li
                            key={index}
                            onClick={() => setSearchValue(product.name)}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul> */}
            </div>

            <div className={styles["products-container"]}>
                {searchValue !== "" ? (
                    filteredProducts.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            openModal={() => setSelectedProduct(product)}
                        />
                    ))
                ) : (
                    products.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            openModal={() => setSelectedProduct(product)}
                        />
                    ))
                )}
            </div>

            {selectedProduct.name !== "" && (
                <ShopModal
                    product={selectedProduct}
                />
            )}
        </div>
    )
}