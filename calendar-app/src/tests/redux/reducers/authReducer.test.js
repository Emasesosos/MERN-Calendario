import '@testing-library/jest-dom';
import { authReducer } from '../../../redux/reducers/authReducer';
import { types } from '../../../redux/types/types';

const initState = {
    checking: true,
    // uid: null,
    // name: null
};

describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const action = {};
        const state = authReducer(initState, action);
        // console.log(state);
        expect(state).toEqual(initState);

    });

    test('Debe de autenticar el usuario', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: 123,
                name: 'Emmanuel'
            }
        };

        const state = authReducer(initState, action);
        // console.log(state);

        expect(state).toEqual({ checking: false, uid: 123, name: 'Emmanuel' });

    });

});