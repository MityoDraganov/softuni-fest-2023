
import styles from "./Shop.module.css"

import { Search } from "../../../components/Search/Search"
import { getAllProducts } from "../../../services/requests"
import { useEffect, useState } from "react"

export const Shop = () => {

    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([])

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const getProducts = async () =>{
        const data = await getAllProducts()
        console.log(data);
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return(
        <div className={styles["container"]}>
            <h1>Shop rendered</h1>
            <div className={styles["search-container"]}>


            <Search 
                onInputChange={onChangeHandler}
                searchValue={searchValue}
            />
            
            <ul>
                {searchValue && filteredProducts.map((product, index) => (
                    <li key={index}>{product.name}</li> 
                ))}
            </ul>
            </div>

        </div>
    )
}