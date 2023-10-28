import styles from "./Product.module.css"


export const Product = ({product, openModal}) => {


    return(
        <div className={styles["container"]}>
            <h1>{product.name}</h1>
            <h2>{product.owner.companyName}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <div className={styles["actions-container"]}>
               <button onClick={openModal}>Buy</button>  {/* <-  Example Change Later */}
            </div>
        </div>
    )
}