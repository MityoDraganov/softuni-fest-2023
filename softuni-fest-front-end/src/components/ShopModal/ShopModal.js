import { coinbaseCheckout, stripeCheckout } from "../../services/requests"
import styles from "./ShopModal.module.css"

export const ShopModal = ({product}) => {

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


    return(
        <div className={styles["container"]}>
            <h1>{product.name}</h1>
            <h2>{product.owner.companyName}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>

            <div className={styles["modal-actions"]}>
                <button onClick={handleCoinbasePayment}>Pay with crypto</button>
                <button onClick={handleStripePayment}>Pay with Stripe</button>
            </div>
        </div>
    )
}
