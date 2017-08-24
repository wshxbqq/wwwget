const request = require('request');
const iconv = require('iconv-lite');

/**
 * 
 * @param {*} config 
 */
const wwwget = function (config) {
    config = Object.assign({
        encoding: null,
        gzip: true,
        maxSize: 5000000,
    }, config);
    return new Promise((resolve, reject) => {
        let size = 0;
        request(config, function (error, response, buffer) {
            if (error) {
                reject(error.message);
                return;
            }
            if (!response.headers) {
                return;
            }
            let encoding;
            if (response.headers["content-type"].includes("charset")) {
                let arr = response.headers["content-type"].split(';');
                arr.map(d => {
                    if (d.includes("charset")) {
                        let fragment = d.split('=')[1];
                        if (fragment) {
                            let tmp = fragment.toLowerCase()
                                .replace(/^\s*/ig, "")
                                .replace(/\s*$/ig, "");
                        }
                    }
                })
            };

            if (!encoding) {
                let utf8Str = iconv.decode(buffer, 'utf-8');
                let htmlEncoding = utf8Str.match(/meta.*?charset.*?=\s*(\w|-)*/ig);
                if (htmlEncoding.length) {
                    htmlEncoding = htmlEncoding[0];
                    encoding = htmlEncoding.replace(/meta.*?charset.*?=\s*/ig, "");
                }
            }

            encoding = encoding || "utf-8";
            let result = {
                data: iconv.decode(buffer, encoding),
                buffer: buffer,
                response: response,
                encoding: encoding,
            };
            resolve(result);
        }).on("data", data => {
            size += data.length;
            if (size > config.maxSize) {
                reject("too big: " + size);
            }
        })
    });
}

wwwget.get = function (url, config = {
    uri: url,
    method: "GET"
}) {
    return wwwget(config);
}

wwwget.post = function (url, config = {
    uri: url,
    method: "POST"
}) {
    return wwwget(config);
}

module.exports = wwwget;