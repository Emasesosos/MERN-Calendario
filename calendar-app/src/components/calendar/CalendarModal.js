import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventUpdated } from '../../redux/actions/events'; // eventAddNew,

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
};

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const initialStateStart = now.toDate();
    const [dateStart, setDateStart] = useState(initialStateStart);

    const initialStateEnd = nowPlus1.toDate();
    const [dateEnd, setDateEnd] = useState(initialStateEnd);

    const [titleValid, setTitleValid] = useState(true);
    
    const [formValues, setFormValues] = useState(initEvent);

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if(activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        console.log('Closing...');
        // TODO de cerrar Modal
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
        
    };

    const handleStartDateChange = (e) => {
        console.log(e);
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = (e) => {
        console.log(e);
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log(formValues);
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if(momentStart.isSameOrAfter(momentEnd)) {
            // console.log('Fecha 2 debe de ser mayor');
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if(title.trim().length < 2) {
            return setTitleValid(false);
        }

        // TODO realizar grabación o actualización
        if(activeEvent) {
            dispatch(eventUpdated(formValues));
        } else {
            dispatch(eventStartAddNew({
                ...formValues
            }));
            /* Desarrollo
            dispatch(eventStartAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: 123,
                    name: "Casandra",
                }
            }));
            */
        }
        
        setTitleValid(true);
        closeModal();

    };

    return (
        <Modal
            isOpen={ modalOpen }
            //onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo evento'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );
};
