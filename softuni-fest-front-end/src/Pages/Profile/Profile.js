import React, { useContext, useEffect, useState } from 'react'
import styles from './Profile.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { getPurchaseHistory } from '../../services/requests';
const Profile = () => {
    const { accessData } = useContext(AuthContext)
    const [purchases, setPurchase] = useState()
    useEffect(() => {
        const getUserPurchaseHistory = async () => {
            try {
                const data = await getPurchaseHistory(accessData._id)
                setPurchase(data)
            }catch(e){

            }
        }
        getUserPurchaseHistory()
    }, [accessData])
    return (
        <div className={styles.profile}>

            <h1>Your Profile</h1>

            <p className={styles.welcome}>Welcome back, {accessData.isBusiness ? accessData.companyName : `${accessData.firstName} ${accessData.lastName}`}!</p>

            <h2>Your Purchases</h2>

            <ul className={styles.purchases}>
                {purchases?.map(purchase => (
                    <li key={purchase?.product._id} className={styles.purchase}>
                        <p>Name: {purchase?.product.name}</p>
                        <p>Description: {purchase?.product.description}</p>
                        <p>Price: ${purchase?.product.price}</p>
                        <p>Paid With: {purchase?.paidWith}</p>
                        <p>Purchase Date: {new Date(purchase?.purchaseDate).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            <a href="/" className={styles.button}>
                Return to Home
            </a>

        </div>
    )
}

export default Profile