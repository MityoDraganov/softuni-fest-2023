import styles from "./ShopModal.module.css"

export const ShopModal = ({product}) => {


    return(
        <div className={styles["container"]}>
            <h2>{product.name}</h2>
            
        </div>
    )
}