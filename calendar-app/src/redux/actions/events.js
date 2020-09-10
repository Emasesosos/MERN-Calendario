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