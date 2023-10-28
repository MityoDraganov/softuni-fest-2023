import styles from "./Product.module.css"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




export const Product = ({ product, openModal, selectedProduct }) => {


    return (
        <div className={`${styles["container"]} ${selectedProduct.name !== "" ? styles["blur-background"] : ""}`}>
            <div className={styles["info-container"]}>
                
                {product.priceId !== null &&
                <div className={`${styles["subscription-mark-container"]} ${selectedProduct.name !== "" ? styles["blur-background"] : ""}`}>
                    <FontAwesomeIcon icon={faCheck} />
                    {selectedProduct.name === "" &&
                        <div className={styles["subscription-tooltip"]}>subscription service</div>
                    }
                </div>
                }
                <h1>{product.name}</h1>
                <p className={styles["companyName"]}>{product.owner.companyName}</p>
                <p>${product.price.toFixed(2)}</p>
            </div>
            <div className={`${styles["actions-container"]} ${selectedProduct.name !== "" ? styles["blur-background"] : ""}`}>
                <button onClick={openModal}>Buy</button>  {/* <-  Example Change Later */}
            </div>
        </div>
    )
}