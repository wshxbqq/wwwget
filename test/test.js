const wwwget = require("../index.js");
// wwwget({
//     uri: 'https://item.jd.com/10552363220.html#none',
// }).then(result => {
//     console.log(result);
// })
wwwget.get('https://item.jd.com/10552363220.html#none').then(result => {
    console.log(result);
})