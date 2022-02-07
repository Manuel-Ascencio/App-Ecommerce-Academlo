import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk, getProductDetailThunk, addProductToCartThunk } from "../redux/actions";

const ShopDetails = () => {

    const product = useSelector(state => state.productDetail);

    const { id } = useParams();
    const dispatch = useDispatch();

    const productSelected = useSelector(state => state.productDetail);
    const productsList = useSelector(state => state.productsList);

    const [ amount, setAmount ] = useState(1)


    useEffect(() => {
        dispatch(getProductDetailThunk(id))
    }, [ dispatch, id ])

    useEffect(() => {
        if(productSelected.category){
            dispatch(filterCategoryThunk(productSelected.category.id))
        }
    }, [ dispatch, productSelected ])

    const addToCart = () => {
        const productDetail = {
            product: id,
            quantity: amount
        } 
        dispatch(addProductToCartThunk(productDetail))
    }

    return(
        <section className="product-info">
            <div className="product-info-container">
                <div className="section-slider-detail">
                    <div className="content-slider-detail">
                        {product.images?.map(product => <img src={product.url} key={product.id} width="100%"/>)}
                    </div>
                </div>
                <div className="detail-container">
                    <h3>{product.name}</h3>
                    <span>${product.price}</span>
                    <div>
                        <p>quantity:</p>
                        <div className="product-quantity">
                            <button onClick={() => setAmount(amount - 1)}>-</button>
                            <h2>{amount}</h2>
                            <button onClick={() => setAmount(amount + 1)}>+</button>
                        </div>
                    </div>
                    <button onClick={addToCart} className="add">Add to cart</button>
                    <p>{product.description}</p>
                </div>
            </div>
            <section className="related-product-list">
                <div>
                    <h5>Related products:</h5>
                    <ul>
                        {
                            productsList?.map(product => 
                                <li key={product.id}>
                                    <img src={product.images?.[0].url} />
                                    <div className="related-product-detail-info">
                                        <h3>{product.name}</h3>
                                        <span>${product.price}</span>
                                        <Link to={`/shop/${product.id}`}>
                                            <button>Add to cart</button>
                                        </Link>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </section>
        </section>
    )
}

export default ShopDetails;