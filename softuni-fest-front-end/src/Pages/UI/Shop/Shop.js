
import styles from "./Shop.module.css"

import { Search } from "../../../components/Search/Search"
import { getAllProducts, getProductsByBusinessId } from "../../../services/requests"
import { useEffect, useState } from "react"

import { Product } from "../../../components/Product/Product"


export const Shop = () => {

    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([])

    const [productsByBussiness, setProductsByBussiness] = useState([])

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const getProducts = async () => {
        const data = await getAllProducts()
        console.log(data);
        setProducts(data)
    }

    const searchBussiness = async (bussinessId) => {
        const data = await getProductsByBusinessId(bussinessId)
        setProductsByBussiness(data)
    }

    useEffect(() => {
        getProducts()
    }, [])



    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
    });



    return (
        <div className={styles["container"]}>

            <div className={styles["search-container"]}>
                <h2>Search</h2>

                <Search
                    onInputChange={onChangeHandler}
                    searchValue={searchValue}
                    searchBussiness={searchBussiness}
                />

                <ul>
                    {searchValue && filteredProducts.map((product, index) => (
                        searchValue !== product.name &&
                        <li
                            key={index}
                            onClick={() => setSearchValue(product.name)}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>

            </div>

            <div className={styles["products-container"]}>
                {productsByBussiness.map((product) => (
                    <Product
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

        </div>
    )
}