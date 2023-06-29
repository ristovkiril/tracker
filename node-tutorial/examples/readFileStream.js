const {createReadStream} = require("fs");

const stream = createReadStream("./large-file.txt");

stream.on("data", (result) => console.log(result));

stream.on('finish', () => console.log("Finish"))
//
// const getCode = (byte) => {
//     const text = byte.toString(16);
//     if (byte < 16) {
//         return '%0' + text;
//     }
//     return '%' + text;
// };
//
// const toString = (bytes) => {
//     var result = '';
//     for (var i = 0; i < bytes.length; ++i) {
//         result += getCode(bytes[i]);
//     }
//     return decodeURIComponent(result);
// };