import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesThunk, filterCategoryThunk, getProductsThunk, filterHeadlineThunk } from "../redux/actions";

const Shop = () => {

    const navigate = useNavigate();

    const products = useSelector(state => state.productsList);
    const categories = useSelector(state => state.categories);

    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, [dispatch])

    const selectCategory = id => dispatch(filterCategoryThunk(id))
    const selectAllProducts = () => dispatch(getProductsThunk())

    const filterHeadline = e => {
        e.preventDefault()
        dispatch(filterHeadlineThunk(search))
    }

    return (
        <section className="shop-container">
            <section className="section-slider">
                <div className="content-slider">
                    {products.map(product => <img src={product.images?.[2].url} key={product.id} width="100%" />)}
                </div>
            </section>
            <div className="additional-information">
                <i className="fas fa-truck"></i>
                <h4>Envios a todo Mexico</h4>
                <p>Enviamos a cualquier parte del país. Si tu pedido es mayor a $500.00 envío gratis</p>
            </div>
            <div className="search-home">
                <form onSubmit={filterHeadline}>
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to search" />
                    <button><i className="fas fa-search"></i></button>
                </form>
            </div>

            <div className="categories">
                <ul>
                    <li><button onClick={selectAllProducts}>All</button></li>
                    {categories.map(category =>
                        <li key={category.id}>
                            <button onClick={() => selectCategory(category.id)}>{category.name}</button>
                        </li>)
                    }
                </ul>
            </div>
            <section className="products">
                <ul>
                    {products.map(product =>
                        <li key={product.id}>
                            <div>
                                <Link to={`/shop/${product.id}`}>
                                    <img src={product.images[0].url} alt="" />
                                </Link>
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <span>${product.price}</span>
                                    <Link to={`/shop/${product.id}`}>
                                        <button>Add to cart</button>
                                    </Link>
                                </div>
                            </div>
                        </li>)
                    }
                </ul>
            </section>
            <footer>
                <div className="info-footer">
                    <div className="info-footer-container">
                        <h5>About us</h5>
                        <p>Our jewelry stores</p>
                        <p>Terms and Conditions</p>
                        <p>Contact us</p>
                    </div>
                    <div className="info-footer-container">
                        <h5>My account</h5>
                        <p>Checkout</p>
                        <p>Cart</p>
                        <p>Orders</p>
                    </div>
                    <div className="info-footer-container">
                        <h5>Products</h5>
                        <h5>Earrings</h5>
                        <p>Necklaces</p>
                        <p>Rings</p>
                        <p>Bracelets</p>
                    </div>
                </div>
                <div className="end-footer">
                    <p>All rights reserved Vanite Jewelry 2022</p>
                    <div className="footer-conatiner-icons">
                        <div className="social-networks-icons">
                            <i className="fab fa-facebook-square"></i>
                            <i className="fab fa-instagram-square"></i>
                        </div>
                        <div className="cards-icons">
                            <i className="fab fa-cc-visa"></i>
                            <i className="fab fa-cc-mastercard"></i>
                            <i className="fab fa-cc-amex"></i>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default Shop;