import Swal from "sweetalert2";
import { fetchSinToken, fetchCorreo } from "../../helpers/fetch";
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
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    };

};

// Start Register
export const startRegister = (name, email, password) => {

    return async(dispatch) => { // Thunk
        
        console.log(name, email, password);
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();
        console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    };

};

// Start Restablish Password
export const startRestablishPass = (email, password) => {

    return async(dispatch) => { // Thunk
        
        console.log(email, password);
        const resp = await fetchSinToken('auth/restablish-pass', { email, password }, 'PUT');
        const body = await resp.json();
        console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const sendCorreo = await fetchCorreo('auth/resend-mail', { email }, 'POST');
            const bodyCorreo = await sendCorreo.json();
            console.log(bodyCorreo);
            Swal.fire({
                icon: 'success',
                title: body.msg,
                text: bodyCorreo.msg
              })
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
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

