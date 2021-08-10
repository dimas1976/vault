import { getCredential, readCredentials } from './utils/credential';
import express from 'express';
import { Credential } from './types';

const app = express();
const port = 3000;

app.get('/api/credentials', async (_req, res) => {
  res.status(200).json(await readCredentials());
});

app.get('/api/credentials/credential', async (req, res) => {
  console.log(req.params);
  // const credential = await getCredential(req.params[0]);
  // res.json(credential);
});

app.get('/', (_req, res) => {
  res.send(readCredentials());
  //   res.send('HEllo');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
