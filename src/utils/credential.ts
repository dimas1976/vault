import { readFile } from 'fs/promises';
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
