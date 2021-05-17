import * as express from 'express';
import {Note} from '../models/note';

export const getRouter = express.Router();

getRouter.get('/notes', (req, res) => {
  const filter = req.query.title?{title: req.query.title.toString()}:{};

  Note.find(filter).then((notes) => {
    if (notes.length !== 0) {
      res.send(notes);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

getRouter.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
