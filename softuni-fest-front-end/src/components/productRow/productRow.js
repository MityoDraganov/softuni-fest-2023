import styles from "./productRow.module.css"

export const productRow = (product) => {


    return(
        <tr>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.actions}</td>
        </tr>
    )
}