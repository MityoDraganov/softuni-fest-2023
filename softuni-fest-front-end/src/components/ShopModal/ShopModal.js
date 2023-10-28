import styles from "./ShopModal.module.css"

export const ShopModal = ({product}) => {


    return(
        <div className={styles["container"]}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            <div className={styles["modal-actions"]}>
                <button>Pay with crypto</button>
                <button>Pay with Stripe</button>
            </div>
        </div>
    )
}