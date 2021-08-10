import { readCredentials } from './utils/credential';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send(readCredentials());
  //   res.send('HEllo');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
