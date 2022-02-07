import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit } = useForm();

    const [loginError, setLoginError] = useState("")

    const navigate = useNavigate()

    const submit = data => {
        console.log(data)
        axios.post("https://ecommerce-exercise-backend.herokuapp.com/login/", data)
            .then(res => {
                localStorage.setItem("token", res.data.access)
                navigate("/shop")
            })
            .catch(() => setLoginError("The data is incorrect"))
    }

    return (
        <section className="login">
            <div className="login-container">
                <div className="logo-image"></div>
                <h2>Vanité</h2>
                <div className="test-data">
                    <h3>Test data</h3>
                    <span>
                        <i className="fas fa-envelope-open-text"></i>
                        admin@admin.com
                    </span>
                    <span>
                        <i className="fas fa-key"></i>
                        root
                    </span>
                </div>
                <form action="" onSubmit={handleSubmit(submit)}>
                    <div className="input-container">
                        <label htmlFor="email" className="label">
                            Email:
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="label">
                            Password:
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <span className="error">{loginError}</span>
                    <button>Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login;