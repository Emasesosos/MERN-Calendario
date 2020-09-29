import '@testing-library/jest-dom';
import { fetchSinToken } from '../../helpers/fetch';

describe('Pruenas en el helper Fetch', () => {

    test('fetchSinToken debe de funcionar', async() => {
        
        const resp = await fetchSinToken('auth', { email: 'emasesosos@gmail.com', password: '123456' }, 'POST');
        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);

    });
    
});