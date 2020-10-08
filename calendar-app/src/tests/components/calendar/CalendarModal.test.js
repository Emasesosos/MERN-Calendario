import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../redux/actions/events';
import { act } from 'react-dom/test-utils';

jest.mock('sweetalert2', () => {
    return {
        fire: jest.fn()
    }
});

jest.mock('./../../../redux/actions/events', () => {
    return {
        eventStartUpdate: jest.fn(),
        eventClearActiveEvent: jest.fn(),
        eventStartAddNew: jest.fn()
    }
});
// Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    auth: {
        uid: 'abc'
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas Notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    ui: {
        modalOpen: true
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);


describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('Debe de mostrar el modal', () => {
        
        // expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

    });

    test('Debe de llamar la acción de actualizar y cerrar modal', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
        
    });

    test('Debe de mostrar error si falta el título', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });

    test('Debe de crear un nuevo evento', () => {

        const initState = {
            auth: {
                uid: 'abc'
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                modalOpen: true
            }
        };
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola Pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();
        
    });

    test('Debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas'
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith( "Error", "La fecha fin debe de ser mayor a la fecha de inicio", "error"); 
        
    });
    
});
