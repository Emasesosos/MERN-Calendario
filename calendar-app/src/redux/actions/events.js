import { types } from "../types/types";

/* ***** Acciones de CELENDAR: Events ***** */

// Agregar nuevo Evento
export const eventAddNew = (event) => {
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