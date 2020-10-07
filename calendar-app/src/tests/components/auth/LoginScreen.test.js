import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../redux/actions/auth';

jest.mock('./../../../redux/actions/auth', () => {
    return {
        startLogin: jest.fn()
    }
})

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter initialEntries={['/auth/login']}>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    test('Debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot(); 

    });

    test('Debe de llamar el dispatch del login', () => {
        
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'emasesosos2@msn.com'
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startLogin).toHaveBeenCalledWith('emasesosos2@msn.com', '123456');

    });
    

});