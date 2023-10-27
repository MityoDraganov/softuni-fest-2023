const host = 'http://localhost:3030'

// const host = process.env.NODE_ENV === 'development' ? "http://localhost:3030/": "https://quiz-app-back-end.vercel.app/"

const request = async (method, url, data) => {
    const options = {
        method,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    };
    if (data) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }


    //Mitko`s work here (delete if mad) - sets the auth token in the headers if there is any
    if(localStorage.access_info){
        const authData = JSON.parse(localStorage.access_info)
        const token = authData.token
        if(token === undefined){
            return
        }
        options.headers["x-authorization"] = token
    }

    try {
        const res = await fetch(host + url, options);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        if (res.status === 401) {
            localStorage.removeItem('access_info'); 
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const patch = request.bind(null, 'PATCH');
const del = request.bind(null, 'DELETE');

export { get, post, put, patch, del };