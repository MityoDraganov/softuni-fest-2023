import { coinbaseCheckout, stripeCheckout } from "../../services/requests"
import styles from "./ShopModal.module.css"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

import { faStripe } from '@fortawesome/free-brands-svg-icons'; // If available



//contexts
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


import { Link } from "react-router-dom";

export const ShopModal = ({ product, closeModal }) => {

    const { accessData } = useContext(AuthContext)

    const handleStripePayment = async () => {
        const response = await stripeCheckout(product._id)
        window.location.href = response.url;
    }
    const handleCoinbasePayment = async () => {
        const response = await coinbaseCheckout(product._id)
        window.location.href = response.url;
    }


    return (
        <div className={styles["container"]}>

            <div className={styles["modal-close-container"]}>

                <button onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

            </div>

            <div>
                <h2>{product.name}</h2>

                <p className={styles["companyName"]}>{product.owner.companyName}</p>

                <label>Item description:</label>
                <p>{product.description}</p>



                <label>Price:</label>
                <p>${product.price.toFixed(2)}</p>

                {accessData.accessToken ?
                    (product.priceId === null ? (
                        <div className={styles["modal-actions"]}>
                            <button onClick={handleStripePayment}>
                                Pay with <FontAwesomeIcon icon={faStripe} />
                            </button>

                            <button onClick={handleCoinbasePayment}>
                                <FontAwesomeIcon icon={faBitcoin} /> Pay with coinbase
                            </button>
                        </div>
                    ) : (
                        <div className={styles["modal-service"]}>
                            <button onClick={handleStripePayment}>
                                Pay with <FontAwesomeIcon icon={faStripe} />
                            </button>
                            <p>This is a subscription service. You can only pay for it with stripe</p>
                        </div>
                    )) : (
                        <div className={styles["modal-info"]}>
                            <p>Only logged in users can make purchases!</p>
                            <p className={styles["modal-nav"]}>
                                <Link to={"/users/login"}>
                                    Click here to log in
                                </Link>
                            </p>
                        </div>
                    )}
            </div>
        </div >
    )
}