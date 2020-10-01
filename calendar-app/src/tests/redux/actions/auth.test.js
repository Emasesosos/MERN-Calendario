import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogin } from '../../../redux/actions/auth';
import { types } from '../../../redux/types/types';

const middlewares = [ thunk ];
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
    
    test('startLogin correcto', async () => {

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

});