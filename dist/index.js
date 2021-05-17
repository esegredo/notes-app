"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("./db/mongoose");
const note_1 = require("./models/note");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post('/notes', (req, res) => {
    const note = new note_1.Note(req.body);
    note.save().then((note) => {
        res.status(201).send(note);
    }).catch((error) => {
        res.status(400).send(error);
    });
});
app.get('/notes', (req, res) => {
    const filter = req.query.title ? { title: req.query.title.toString() } : {};
    note_1.Note.find(filter).then((notes) => {
        if (notes.length !== 0) {
            res.send(notes);
        }
        else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
});
app.get('/notes/:id', (req, res) => {
    note_1.Note.findById(req.params.id).then((note) => {
        if (!note) {
            res.status(404).send();
        }
        else {
            res.send(note);
        }
    }).catch(() => {
        res.status(500).send();
    });
});
app.patch('/notes', (req, res) => {
    if (!req.query.title) {
        res.status(400).send({
            error: 'A title must be provided',
        });
    }
    else {
        const allowedUpdates = ['title', 'body', 'color'];
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
        if (!isValidUpdate) {
            res.status(400).send({
                error: 'Update is not permitted',
            });
        }
        else {
            note_1.Note.findOneAndUpdate({ title: req.query.title.toString() }, req.body, {
                new: true,
                runValidators: true,
            }).then((note) => {
                if (!note) {
                    res.status(404).send();
                }
                else {
                    res.send(note);
                }
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
    }
});
app.patch('/notes/:id', (req, res) => {
    const allowedUpdates = ['title', 'body', 'color'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    else {
        note_1.Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).then((note) => {
            if (!note) {
                res.status(404).send();
            }
            else {
                res.send(note);
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
});
app.delete('/notes', (req, res) => {
    if (!req.query.title) {
        res.status(400).send({
            error: 'A title must be provided',
        });
    }
    else {
        note_1.Note.findOneAndDelete({ title: req.query.title.toString() }).then((note) => {
            if (!note) {
                res.status(404).send();
            }
            else {
                res.send(note);
            }
        }).catch(() => {
            res.status(400).send();
        });
    }
});
app.delete('/notes/:id', (req, res) => {
    note_1.Note.findByIdAndDelete(req.params.id).then((note) => {
        if (!note) {
            res.status(404).send();
        }
        else {
            res.send(note);
        }
    }).catch(() => {
        res.status(400).send();
    });
});
app.all('*', (_, res) => {
    res.status(501).send();
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
