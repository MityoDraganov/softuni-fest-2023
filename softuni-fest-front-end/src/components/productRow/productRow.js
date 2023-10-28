export const ProductRow = ({ product, setEditingIndex, deleteHandler }) => {


    return(
        <tr className="product-row">
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price.toFixed(2)}</td>
            <td>
                <div>
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
