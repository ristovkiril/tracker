const EventEmitter = require('node-tutorial/examples/events');

const customEmitter = new EventEmitter();

customEmitter.on("response", () => console.log("EMITTER"))

customEmitter.emit("response")