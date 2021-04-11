
const initialState = {
    user: {},
    isLoading: false,
    errorMessage: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "Add Data" :
            return {
                ...state,
                user: action.value
            }

        case "CHANGE_USER" :
            return {
                ...state,
                user: action.value
            }
        case "CHANGE_ERROR" :
            return {
                ...state,
                errorMessage: action.value
            }
        case "CHANGE_LOADING" :
            return {
                ...state,
                isLoading: action.value
            }
        default:
            return state;
    }
}


export default reducer;
