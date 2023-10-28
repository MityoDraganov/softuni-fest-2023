import React, { useEffect } from 'react'
import styles from './PaymentSuccessful.module.css';
import { useNavigate } from 'react-router-dom';
const PaymentSuccessful = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 6000);
    }, [navigate])
    return (
        <div className={styles.success}>

            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>

            <h1>Payment Successful!</h1>

            <p>
                Thank you for your payment. Your transaction has been
                completed successfully. The payment details have been sent
                to your email address.
            </p>

            <p>
                If you have any additional questions or need assistance,
                please contact our support team.
            </p>
        </div>
    )
}

export default PaymentSuccessful