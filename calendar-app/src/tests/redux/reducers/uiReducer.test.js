import '@testing-library/jest-dom';
import { uiCloseModal, uiOpenModal } from '../../../redux/actions/ui';
import { uiReducer } from '../../../redux/reducers/uiReducer';

const initState = {
    modalOpen: false
};

describe('Pruebas en uiReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const state = uiReducer(initState, {});
        expect(state).toEqual(initState);

    });

    test('Debe de abrir y cerrar el modal', () => {

        const modalOpen = uiOpenModal();
        const state = uiReducer(initState, modalOpen);
        // console.log(state);

        expect(state).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);
        // console.log(stateClose);

        expect(stateClose).toEqual({ modalOpen: false });

    });


});