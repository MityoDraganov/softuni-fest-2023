import { coinbaseCheckout, stripeCheckout } from "../../services/requests"
import styles from "./ShopModal.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const ShopModal = ({ product, closeModal }) => {

    const handleStripePayment = async () => {
        const response = await stripeCheckout(product._id)
        window.location.href = response.url;
        console.log(response);
    }
    const handleCoinbasePayment = async () => {
        const response = await coinbaseCheckout(product._id)
        window.location.href = response.url;
        console.log(response);
    }


    return (
        <div className={styles["container"]}>
<<<<<<< Updated upstream
            <h1>{product.name}</h1>
            <h2>{product.owner.companyName}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>

            <div className={styles["modal-actions"]}>
                <button onClick={handleCoinbasePayment}>Pay with crypto</button>
                <button onClick={handleStripePayment}>Pay with Stripe</button>
=======


            <div>
                <h2>{product.name}</h2>

                <p>{product.owner.companyName}</p>

                <label>Item description:</label>
                <p>{product.description}</p>



                <label>Price:</label>
                <p>${product.price.toFixed(2)}</p>

                <div className={styles["modal-actions"]}>
                    <button>Pay with crypto</button>
                    <button>Pay with Stripe</button>
                </div>

            </div>

            <div className={styles["modal-close-container"]}>

                <button onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

>>>>>>> Stashed changes
            </div>
        </div>
    )
}
