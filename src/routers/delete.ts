import * as express from 'express';
import {Note} from '../models/note';

export const deleteRouter = express.Router();

deleteRouter.delete('/notes', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    Note.findOneAndDelete({title: req.query.title.toString()}).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});

deleteRouter.delete('/notes/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(400).send();
  });
});