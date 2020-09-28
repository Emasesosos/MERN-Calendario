import { fetchConToken } from "../../helpers/fetch";
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

// Actualizar Nota
export const eventUpdated = (event) => {
    return {
        type: types.eventUpdated,
        payload: event
    }
};

// Eliminar Nota
export const eventDeleted = () => {
    return {
        type: types.eventDeleted,
    }

};