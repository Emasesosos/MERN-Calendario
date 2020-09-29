import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../../helpers/fetch"; // fetchCorreo,
import { types } from "../types/types";

/* ***** Acciones de Auth: Usuario ***** */

// Inicio Login Usuario
export const startLogin = (email, password) => {

    return async(dispatch) => { // Thunk

        // console.log(email, password);
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        // console.log(body);

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

        // console.log(name, email, password);
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();
        // console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // const sendCorreo = await fetchCorreo('auth/send-mail', { email }, 'POST');
            // const bodyCorreo = await sendCorreo.json();
            // console.log(bodyCorreo);
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Se creó nuevo Usuario',
            //     text: bodyCorreo.msg
            // });
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

        // console.log(email, password);
        const resp = await fetchSinToken('auth/restablish-pass', { email, password }, 'PUT');
        const body = await resp.json();
        // console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // const sendCorreo = await fetchCorreo('auth/resend-mail', { email }, 'POST');
            // const bodyCorreo = await sendCorreo.json();
            // // console.log(bodyCorreo);
            // Swal.fire({
            //     icon: 'success',
            //     title: body.msg,
            //     text: bodyCorreo.msg
            // });
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    };

};

// Start Checking
export const startChecking = () => {

    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        // console.log(body);

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            // Swal.fire('Error', body.msg, 'error');
            dispatch(checkingFinish());
        }

    };

};

const checkingFinish = () => {

    return {
        type: types.authCheckingFinish
    };

};

// Login Usuario
const login = (user) => {

    return {
        type: types.authLogin,
        payload: user
    };

};

// Start Logout
export const startLogout = () => {

    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    };

};

// Logout
const logout = () => {

    return {
        type: types.authLogout,
    };

};