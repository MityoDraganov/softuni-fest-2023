import styles from "./Product.module.css"


export const Product = ({product, openModal}) => {


    return(
        <div className={styles["container"]}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles["actions-container"]}>
               <button onClick={openModal}>Buy</button>  {/* <-  Example Change Later */}
            </div>
        </div>
    )
}