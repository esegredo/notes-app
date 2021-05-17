"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
mongoose_1.connect('mongodb://127.0.0.1:27017/notes-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connection to MongoDB server established');
}).catch(() => {
    console.log('Unnable to connect to MongoDB server');
});
