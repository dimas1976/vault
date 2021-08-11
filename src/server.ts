import {
  getCredential,
  readCredentials,
  addCredential,
  deleteCredential,
} from './utils/credential';

import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/api/credentials', async (_req, res) => {
  try {
    res.status(200).json(await readCredentials());
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal ServerError`);
  }
});

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    const credential = await getCredential(service);
    res.status(200).json(credential);
  } catch (error) {
    console.error(error);
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.get('/', (_req, res) => {
  res.send(readCredentials());
});

app.post('/api/credentials', async (req, res) => {
  try {
    await addCredential(req.body);
  } catch {
    console.error(`Es wurde kein neues credential zugefügt`);
    res.send('kein neues credential');
  }
});

app.delete('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    await deleteCredential(service);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.send(`Ups`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
