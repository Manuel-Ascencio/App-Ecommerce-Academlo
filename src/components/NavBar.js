import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {

    const [showNavigationBar, setShowNavigationBar] = useState(false)

    const show = () => {
        setShowNavigationBar(true)
    }
    const hidden = () => {
        setShowNavigationBar(false)
    }

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }



    return (
        <nav>
            <section className="header-home">
                <div className="header-home-container">
                    <button onClick={show} className="menu-button"></button>
                    <div className="logo-home">
                        <div className="logo-image"></div>
                        <h2>Vanité</h2>
                    </div>
                    <div className={`${showNavigationBar ? "container-links hidden" : "container-links"}`}>
                        <button onClick={hidden} className="show_menu">
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="links">
                            <button onClick={hidden}>
                                <Link to="/shop" className="link" >Shop</Link>
                            </button>
                            <button onClick={hidden}>
                                <Link to="/shop" className="link">About</Link>
                            </button>
                            <button onClick={hidden}>
                                <Link to="/shop" className="link">Contact</Link>
                            </button>
                            <button onClick={hidden}>
                                <Link to="/cart" className="link">My orders</Link>
                            </button>
                            <button onClick={logOut} className="logOut">Log Out</button>
                        </div>
                    </div>
                    <Link to="/cart">
                        <ion-icon name="bag-handle-sharp"></ion-icon>
                    </Link>
                </div>
            </section>
        </nav>
    )
}

export default NavBar;