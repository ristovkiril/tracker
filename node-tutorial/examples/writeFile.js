const {writeFileSync} = require("fs");

for (let i = 0; i < 1000; i++) {
    writeFileSync("./large-file.txt", `Hello Word for ${i} times\n`, { flag: "a" });
}