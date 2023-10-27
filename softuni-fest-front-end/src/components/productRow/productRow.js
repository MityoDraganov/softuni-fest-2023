import styles from "./productRow.module.css"

export const productRow = (product) => {
    return(
        <tr className="product-row">
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </td>
        </tr>
    )
}