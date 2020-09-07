

function postApi(url, body) {
    return fetch(url, {
        method: "POST", // POST, PUT, DELETE, etc.
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (response.ok) return response.json();
        throw response;
    })
    .then(json => {
        if (json.errno === 0){            
            return json.data;
        }
        throw json.message;
    })
}


export { postApi }