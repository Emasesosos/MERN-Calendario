import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/events'; // eventDeleted,

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        // dispatch(eventDeleted()); // Desarrollo
        dispatch(eventStartDelete()); // Frontend y Backend integrado
    };

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    );
};
