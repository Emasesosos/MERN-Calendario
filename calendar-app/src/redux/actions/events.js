import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../types/types";

/* ***** Acciones de CELENDAR: Events ***** */

// Preparar Nuevo en vento en DB
export const eventStartAddNew = (event) => {

    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            // console.log(event);
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            if (!body.ok) throw new Error('No se pudo realizar la petición');
            // console.log(body);
            event.id = body.evento.id;
            event.user = {
                _id: uid,
                name
            };
            // console.log(event);
            dispatch(eventAddNew(event));
        } catch (error) {
            throw error;
        }

    };

};

// Agregar nuevo Evento
const eventAddNew = (event) => {
    //export const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    };
};

// Activar Evento
export const eventSetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    };
};

// Limpiar Nota Activa
export const eventClearActiveEvent = () => {
    return {
        type: types.eventClearActiveEvent,
    };
};

// Actualizar Nota BD
export const eventStartUpdate = (event) => {

    return async(dispatch) => {

        try {
            // console.log(event);
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            // console.log(body);
            if (!body.ok) Swal.fire('Error', body.msg, 'error');
            dispatch(eventUpdated(event));
        } catch (error) {
            throw error;
        }
    };

};

// Actualizar Nota state
const eventUpdated = (event) => {
    return {
        type: types.eventUpdated,
        payload: event
    }
};

// Eliminar Nota BD
export const eventStartDelete = () => {

    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE');
            const body = await resp.json();
            // console.log(body);
            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            throw error;
        }
    };

};

// Eliminar Nota state
const eventDeleted = () => {
    return {
        type: types.eventDeleted,
    };
};

// Cargar Eventos de la BD
export const eventStartLoaded = () => {

    return async(dispatch) => {

        try {

            const resp = await fetchConToken('events');
            const body = await resp.json();
            // console.log(body);
            if (!body.ok) throw new Error('No se pudo realizar la petición');

            const events = prepareEvents(body.eventos);
            // console.log(events);
            dispatch(eventLoaded(events));

        } catch (error) {
            throw error;
        }

    };

};

// Cargar eventos en el State
const eventLoaded = (events) => {

    return {
        type: types.eventLoaded,
        payload: events
    };

};

// Event Logout
export const eventLogout = () => {

    return {
        type: types.eventLogout
    };

};