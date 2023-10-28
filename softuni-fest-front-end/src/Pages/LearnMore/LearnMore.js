import styles from './LearnMore.module.css';

export default function LearnMore() {
    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h1>
                    Learn More About Our <span className={styles.brand}>Payment Service</span>
                </h1>
                <p>Our secure platform makes accepting payments easy.</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.item}>
                    <h3>Secure Encryption</h3>
                    <p>We use industry standard encryption to protect your customers' financial data.</p>
                </div>

                <div className={styles.item}>
                    <h3>Accept Major Cards</h3>
                    <p>We allow payments with Visa, Mastercard, American Express, and Discover.</p>
                </div>

                <div className={styles.item}>
                    <h3>Seamless Integration</h3>
                    <p>Our API and SDKs make it easy to integrate payments into your product.</p>
                </div>
            </div>

            <p className={styles.cta}>
                Get in touch to learn more about using our payment platform. Our team is ready to help you
                accept payments and grow your business.
            </p>
        </div>
    );
}