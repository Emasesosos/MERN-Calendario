const baseUrl = process.env.REACT_APP_API_URL;

// Fecth sin Token
const fetchSinToken = (endPoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endPoint}`; // http://localhost:4000/api/(auth/events)

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

};

//Fetch con Token
// Fetch Sen Email
const fetchCorreo = (endPoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endPoint}`; // http://localhost:4000/api/(auth/events)

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

};

export {
    fetchSinToken,
    fetchCorreo
};