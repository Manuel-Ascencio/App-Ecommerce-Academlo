import axios from "axios";
import { getConfig } from "../../utils";
import swal from "sweetalert";

export const actions = {
    getProducts: "GET_PRODUCTS",
    getProductDetail: "GET_PRODUCT_DETAIL",
    setIsLoading: "SET_IS_LOADING",
    getCategories: "GET_CATEGORIES",
    addToCart: "ADD_TO_CART"
}

export const getProducts = products => ({
    type: actions.getProducts,
    payload: products
});

export const getProductDetail = product => ({
    type: actions.getProductDetail,
    payload: product
});

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
});

export const getCategories = categories => ({
    type: actions.getCategories,
    payload: categories
});

export const addToCart = product => ({
    type: actions.addToCart,
    payload: product
});

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get("https://ecommerce-exercise-backend.herokuapp.com/products/", getConfig())
            .then(res => dispatch(getProducts(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getProductDetailThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/${id}/`, getConfig())
            .then(res => dispatch(getProductDetail(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true));
        axios.get("https://ecommerce-exercise-backend.herokuapp.com/categories/", getConfig())
            .then(res => dispatch(getCategories(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?category=${id}`, getConfig())
            .then(res => dispatch(getProducts(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const filterHeadlineThunk = headline => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?name__icontains=${headline}`, getConfig())
            .then(res => dispatch(getProducts(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const getAddedToCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get("https://ecommerce-exercise-backend.herokuapp.com/cart/", getConfig())
            .then(res => dispatch(addToCart(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const addProductToCartThunk = product => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.post("https://ecommerce-exercise-backend.herokuapp.com/products/add_to_cart/", product, getConfig())
            .then(() => {
                dispatch(getAddedToCartThunk())
                swal({
                    title: "Product added to cart",
                    icon: "success",
                    timer: "2000"
                })
            })
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}

export const deleteProductThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.delete(`https://ecommerce-exercise-backend.herokuapp.com/cart/${id}/remove_item/`, getConfig())
            .then(() => dispatch(getAddedToCartThunk()))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)));
    }
}