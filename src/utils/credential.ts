import { readFile, writeFile } from 'fs/promises';
import { DB, Credential } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('./src/db.json', 'utf-8');
  const db: DB = JSON.parse(response);
  const credentials = db.credentials;
  return credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  const filteredCredential = credentials.find(
    (credential) => credential.service === service
  );

  if (!filteredCredential) {
    throw new Error(`No credential: ${service}`);
  }

  return filteredCredential;
}

export async function addCredential(credential: Credential): Promise<void> {
  const credentials = await readCredentials();

  const updatedCredentials = [...credentials, credential];
  const database: DB = {
    credentials: updatedCredentials,
  };
  database.credentials = updatedCredentials;
  await writeFile('./src/db.json', JSON.stringify(database));
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials: Credential[] = await readCredentials();
  const updatedCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  if (credentials.length === updatedCredentials.length) {
    throw new Error(`es gibts nicht zu löschen`);
  }
  const database: DB = {
    credentials: updatedCredentials,
  };
  database.credentials = updatedCredentials;
  await writeFile('./src/db.json', JSON.stringify(database));
}
