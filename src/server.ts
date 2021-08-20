import {
  getCredential,
  readCredentials,
  addCredential,
  deleteCredential,
  updateCredential,
} from './utils/credential';

import express from 'express';
import { validateMasterPassword } from './utils/validation';
import { connectToDataBase } from './utils/database';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error(`No MongoDB env variable`);
}

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get('/api/credentials', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unathorized request');
    return;
  }
  try {
    res.status(200).json(await readCredentials(masterPassword));
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal ServerError`);
  }
});

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unathorized request');
    return;
  }
  try {
    const credential = await getCredential(service, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    console.error(error);
    res.status(404).send(`Could not find service: ${service}`);
  }
});

app.post('/api/credentials', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unathorized request');
    return;
  }

  try {
    const addedCredentialID = await addCredential(req.body, masterPassword);
    res.status(200).send(addedCredentialID);
  } catch {
    console.error(`There is no new credential`);
    res.send('There is no new credential');
  }
});

app.delete('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    const deletedCredential = await deleteCredential(service);
    res.status(200).json(deletedCredential);
  } catch (error) {
    console.error(error);
    res.send(error.toString());
  }
});

app.put('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unathorized request');
    return;
  }

  try {
    await updateCredential(service, req.body, masterPassword);
    res.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

app.get('/', (_req, res) => {
  res.send('Hello Credentials!');
});

connectToDataBase(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
});
