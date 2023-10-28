import styles from "./Product.module.css"


export const Product = ({product}) => {


    return(
        <div className={styles["container"]}>
            <h2>{product.name}</h2>
            <h4>{product.owner}</h4>
            <p>{product.description}</p>
            <div className={styles["actions-container"]}>
               <button>Buy</button>  {/* <-  Example Change Later */}
            </div>
        </div>
    )
}