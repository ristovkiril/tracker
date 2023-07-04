import createContext from "./createContext";

const authReducer = (state, action) => {
    switch (action.type) {

        default: return state;
    }
}

const login = (dispatch) => {
    return ({email, password}) => {

    }
}
const register = (dispatch) => {
    return ({email, password, first_name, last_name}) => {

    }
}

const logout = (dispatch) => {
    return () => {
        
    }
}

export const {Provider, Context} = createContext(
    authReducer,
    {},
    {
        isSignedIn: false,
        user: null,
    }
)