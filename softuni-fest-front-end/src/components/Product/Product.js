import styles from "./Product.module.css"


export const Product = ({product, openModal}) => {


    return(
        <div className={styles["container"]}>
            <h1>{product.name}</h1>
            <p className={styles["companyName"]}>{product.owner.companyName}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className={styles["actions-container"]}>
               <button onClick={openModal}>Buy</button>  {/* <-  Example Change Later */}
            </div>
        </div>
    )
}