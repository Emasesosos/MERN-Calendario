import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

// jest.mock('./../../../redux/actions/events.js', () => {
//     return {
//         eventStartDelete: jest.fn()
//     }
// });

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
        
    });
    
});
