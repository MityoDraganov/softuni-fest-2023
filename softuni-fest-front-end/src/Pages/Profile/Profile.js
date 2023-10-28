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
                    <li key={purchase._id} className={styles.purchase}>
                        <p>{purchase.name}</p>
                        <p>{purchase.description}</p>
                        <p>${purchase.price}</p>
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