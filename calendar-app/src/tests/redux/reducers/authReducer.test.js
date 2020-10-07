import '@testing-library/jest-dom';
import { authReducer } from '../../../redux/reducers/authReducer';

const initState = {
    checking: true,
    // uid: null,
    // name: null
};

describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const state = authReducer(initState, {});
        // console.log(state);
        expect(state).toEqual(initState);

    });

});