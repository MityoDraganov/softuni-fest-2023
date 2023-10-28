import styles from "./ProductRow.module.css"

export const ProductRow = ({ product, setEditingIndex, deleteHandler }) => {


    return(
        <tr className={styles["product-row"]}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price.toFixed(2)}</td>
            <td>
                <div className={styles["actions-container"]}>
                    <button onClick={setEditingIndex}>Edit</button>
                    <button 
                        onClick={deleteHandler}
                    >
                        Delete
                        </button>
                </div>
            </td>
        </tr>
    )
}
