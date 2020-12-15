import {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {user: null};

if (localStorage.getItem('userData')) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const decodedToken = jwtDecode(userData.token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('userData');
    } else {
        initialState.user = userData;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: null};
        default:
            return state;
    }
}

function AuhtProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch({
            type: LOGIN,
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem('userData');
        dispatch({type: LOGOUT});
    }

    return <AuthContext.Provider
        value={{user: state.user, login, logout}}
        {...props}
    />
}

export {AuthContext, AuhtProvider};
