import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../../redux/actions/auth';
import { types } from '../../../redux/types/types';
import * as fetchModule from './../../../helpers/fetch';

jest.mock('sweetalert2', () => {
    return {
        fire: jest.fn()
    }
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
let token;

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones del Auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correcto', async() => {

        await store.dispatch(startLogin('emasesosos@gmail.com', '123456'));
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1];
        // console.log(localStorage.setItem.mock.calls[0][1]);

    });

    test('startLogin incorrecto', async() => {

        await store.dispatch(startLogin('emasesosos@gmail.com', '123455'));
        let actions = store.getActions();
        //  console.log(actions);
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error");

        await store.dispatch(startLogin('emasesosos2@gmail.com', '123456'));
        actions = store.getActions();
        //  console.log(actions);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "El usuario no existe con ese email", "error");

    });

    test('startRegister correcto', async() => {

        fetchModule.fetchSinToken = jest.fn(() => {
            return {
                json() {
                    return {
                        ok: true,
                        uid: '123',
                        name: 'casandra',
                        token: 'ABC123ABC123'
                    }
                }
            }
        });

        await store.dispatch(startRegister('Test', 'test@test.com', '123456'));
        const actions = store.getActions();
        //  console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'casandra'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

});