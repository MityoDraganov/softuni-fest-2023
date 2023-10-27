import './productRow.css';

export const productRow = (product) => {
    return(
        <tr className="product-row">
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.actions}</td>
        </tr>
    )
}