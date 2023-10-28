import { coinbaseCheckout, stripeCheckout } from "../../services/requests"
import styles from "./ShopModal.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//contexts
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


import { Link } from "react-router-dom";

export const ShopModal = ({ product, closeModal }) => {

    const { accessData } = useContext(AuthContext)

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
                    (
                        <div className={styles["modal-actions"]}>
                            <button onClick={handleStripePayment}>Pay with Stripe</button> 
                            <button onClick={handleCoinbasePayment}>Pay with crypto</button>
                        </div>
                    )
                    :
                    (
                        <div className={styles["modal-info"]}>
                            <p>Only logged in users can make purchases!</p>

                            <p className={styles["modal-nav"]}>
                                <Link to={"/users/login"}>
                                    Click here to log in
                                </Link>
                            </p>
                        </div>
                    )
                }
            </div>


        </div>
    )
}
