import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../redux/types/types';
import { eventSetActive } from '../../../redux/actions/events';

jest.mock('./../../../redux/actions/events', () => {
    return {
        eventSetActive: jest.fn(),
        eventStartLoaded: jest.fn()
    }
});
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'abc'
    },
    calendar: {
        events: []
    },
    ui: {
        modalOpen: false
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
);

describe('Pruebas en <CalendarScreen />', () => {
    
    test('Debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
        
    });

    test('Pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        // console.log(calendarMessages);
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.uiOpenModal
        });

        calendar.prop('onSelectEvent')({ start: 'Hola'});
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'Hola'});

        act(() => {

            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
            
        });
        
    });
    
});
