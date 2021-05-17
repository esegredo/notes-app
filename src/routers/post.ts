import * as express from 'express';
import {Note} from '../models/note';

export const postRouter = express.Router();

postRouter.post('/notes', (req, res) => {
  const note = new Note(req.body);

  note.save().then((note) => {
    res.status(201).send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});
