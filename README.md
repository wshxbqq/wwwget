# wwwget

simple http/s graber with auto decoding (base on request)

## Example

跟据 http 头中的 content-type 或 html 中的 meta 决定编码。

```javascript
const wwwget = require("../index.js");
wwwget({
    uri: 'https://item.jd.com/',
}).then(result => {
    console.log(result);
})

//----------------

wwwget.get('https://item.jd.com/').then(result => {
    console.log(result);
})

//----------------

wwwget.post('https://item.jd.com/').then(result => {
    console.log(result);
})

```

