import { fetchSinToken } from "../../helpers/fetch";
import { types } from "../types/types";

/* ***** Acciones de Auth: Usuario ***** */

// Inicio Login Usuario
export const startLogin = (email, password) => {

    return async(dispatch) => { // Thunk

        console.log(email, password);
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }

    };

};

// Login Usuario
const login = (user) => {

    return {
        type: types.authLogin,
        payload: user
    };

};