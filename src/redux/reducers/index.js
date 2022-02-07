import { actions } from "../actions"

const INITIAL_STATE = {
    productsList: [],
    productDetail: {},
    isLoading: false,
    categories: [],
    addedToCart: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.getProducts:
            return{
                ...state,
                productsList: action.payload
            }
        case actions.setIsLoading:
            return{
                ...state,
                isLoading: action.payload
            }
        case actions.getProductDetail:
            return{
                ...state,
                productDetail: action.payload
            }
        case actions.getCategories:
            return{
                ...state,
                categories: action.payload
            }
        case actions.addToCart:
            return{
                ...state,
                addedToCart: action.payload
            }
    
        default:
            return state
    }
}

export default reducer;