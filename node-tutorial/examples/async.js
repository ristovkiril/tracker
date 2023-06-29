const {readFile, writeFile} = require('fs')
const util = require('util');

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

const printFile = async () => {
    console.time();
    try {
        const first = await readFilePromise("./myfile.txt", 'utf8');
        const second = await readFilePromise("./anotherfile.txt", 'utf8');
        await writeFilePromise("./merged.txt", first + second);
        console.log("File saved!");
    } catch (error) {
        console.log(error)
    } finally {
        console.timeEnd();
    }
}

console.log("Before time out")
setTimeout(() => {
    printFile();
}, [0])
console.log("After time out")
// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, "utf-8", (err, data) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(data);
//         })
//     })
// }

// console.time();
// getText("./myfile.txt")
//     .then(response => console.log(response))
//     .catch(error => console.log(error));
// console.timeEnd();
