import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { startRegister } from '../../../redux/actions/auth';

jest.mock('./../../../redux/actions/auth', () => {
    return {
        startRegister: jest.fn()
    }
});

jest.mock('sweetalert2', () => {
    return {
        fire: jest.fn()
    }
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter initialEntries={['/auth/register']}>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="password1"]').simulate('change', {
            target: {
                name: 'password1',
                value: '123456'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target: {
                name: 'password2',
                value: '123455'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales', 'error');
        
    }); 

    test('Registro con contraseñas iguales', () => {
        
        wrapper.find('input[name="password1"]').simulate('change', {
            target: {
                name: 'password1',
                value: '123456'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target: {
                name: 'password2',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect(Swal.fire).not.toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith("Emasesosos", "correo@correo.com", "123456");

    });
    
});



