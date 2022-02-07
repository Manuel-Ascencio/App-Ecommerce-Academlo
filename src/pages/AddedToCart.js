import Rect, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAddedToCartThunk, deleteProductThunk } from "../redux/actions";

const AddToCart = () => {

    const dispatch = useDispatch();
    const addedToCart = useSelector(state => state.addedToCart)


    useEffect(() => dispatch(getAddedToCartThunk()), [dispatch])

    const deleteProduct = id => {
        dispatch(deleteProductThunk(id))
    }
    const precio = useSelector(state => state.addedToCart)

    const subtotal = []

    for (let i = 0; i < precio.length; i++) {
        subtotal.push(precio[i].product.price)
    }
    let total = 0;
    for (let i = 0; i < subtotal.length; i++) {
        total += parseInt(subtotal[i])
    }


    return (
        <section className="added-to-cart">
            <h2>SHOPPING CART</h2>
            <table>
                <thead>
                    <tr>
                        <th>product</th>
                        <th>quantity</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        addedToCart.map(product =>
                            <tr key={product.id}>
                                <td>
                                    <button onClick={() => deleteProduct(product.id)}><i className="fas fa-times"></i></button>
                                    <img src={product.product.images[0].url} alt="" width="350px" />
                                    <Link to={`/shop/${product.product.id}`}>{product.product?.name}</Link>
                                </td>
                                <td>
                                    <span>{product.quantity}</span>
                                </td>
                                <td>
                                    ${product.product.price}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="total-container">
                Subtotal:
                <span className="total">
                    ${total}.00
                </span>
            </div>
        </section>
    )
}

export default AddToCart;