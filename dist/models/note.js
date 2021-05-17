"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('Note title must start with a capital letter');
            }
        },
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        default: 'yellow',
        trim: true,
        enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
    },
});
exports.Note = mongoose_1.model('Note', NoteSchema);
