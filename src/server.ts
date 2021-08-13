import {
  getCredential,
  readCredentials,
  addCredential,
  deleteCredential,
  updateCredential,
} from './utils/credential';

import express from 'express';
import { validateMasterPasswort } from './utils/validation';

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
  const masterPass = req.headers.authorization;
  if (!masterPass) {
    res.status(400).send('Authorization header missing');
    return;
  } else if ((await validateMasterPasswort(masterPass)) === false) {
    res.status(401).send('Unathorized request');
    return;
  }
  try {
    const credential = await getCredential(service, masterPass);
    console.log(credential);
    res.status(200).json(credential);
  } catch (error) {
    console.error(error);
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.post('/api/credentials', async (req, res) => {
  const masterPass = req.headers.authorization;
  if (!masterPass) {
    res.status(400).send('Authorization header missing');
    return;
  } else if ((await validateMasterPasswort(masterPass)) === false) {
    res.status(401).send('Unathorized request');
    return;
  }

  try {
    console.log(req.body);
    await addCredential(req.body, masterPass);
    res.json(req.body);
  } catch {
    console.error(`There is no new credential`);
    res.send('There is no new credential');
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

app.put('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  await updateCredential(service, req.body);
  res.status(200).send();
});

app.get('/', (_req, res) => {
  res.send(readCredentials());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
