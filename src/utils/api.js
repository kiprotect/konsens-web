function formatParams(params) {
    return (
        '?' +
        Object.keys(params)
            .map(function (key) {
                return key + '=' + encodeURIComponent(params[key]);
            })
            .join('&')
    );
}

export default class KonsensApi {
    constructor(url, id, opts) {
        this.url = url;
        this.id = id;
        this.opts = Object.assign({}, opts);
    }

    apiRequest(type, path, data, contentType) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('load', () => {
                const data = JSON.parse(xhr.response);
                if (xhr.status < 200 || xhr.status >= 300) {
                    data.status = xhr.status;
                    // the request wasn't successful
                    reject(data);
                } else {
                    // the request was successful
                    resolve(data);
                }
            });

            xhr.addEventListener('error', () => {
                // something else went wrong (e.g. request got blocked)
                reject({ status: 0, xhr: xhr });
            });

            let body;

            if (data !== undefined) {
                if (type === 'GET') {
                    path += '?' + formatParams(data);
                } else {
                    body = JSON.stringify(data);
                }
            }

            xhr.open(type, this.url + path);

            if (body !== undefined) {
                // we must call setRequestHeader after 'open'
                xhr.setRequestHeader(
                    'Content-Type',
                    contentType || 'application/json;charset=UTF-8'
                );
            }

            xhr.send(body);
        });
    }

    submitEvents(events) {
        return this.apiRequest(
            'POST',
            '/v1/anonymizers/' + this.id + '/collect',
            {events: events},
            'text/plain;charset=UTF-8'
        );
    }

    /*
    Load a specific Konsens config from the API.
    */
    loadConfig(name) {
        return this.apiRequest(
            'GET',
            '/v1/anonymizers/' + this.id + '/config.json?name=' + name + (this.opts.testing ? '&testing=true' : '')
        );
    }
}
