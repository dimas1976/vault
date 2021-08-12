import CryptoJS from 'crypto-js';
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
  const filteredCredential = credentials.find((credential) => {
    return credential.service === service;
  });

  if (!filteredCredential) {
    throw new Error(`No credential: ${service}`);
  }

  return filteredCredential;
}

export async function addCredential(credential: Credential): Promise<void> {
  const credentials = await readCredentials();
  const encryptedCredentialPass = CryptoJS.TripleDES.encrypt(
    credential.password,
    'neuefische'
  );
  credential.password = encryptedCredentialPass.toString();
  const updatedCredentials = [...credentials, credential];
  await overwriteDB(updatedCredentials);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials: Credential[] = await readCredentials();
  const updatedCredentials = credentials.filter(
    (credential) => credential.service !== service
  );
  if (credentials.length === updatedCredentials.length) {
    throw new Error(`There is nothing to delete`);
  }
  await overwriteDB(updatedCredentials);
}

export async function updateCredential(
  service: string,
  credential: Credential
): Promise<void> {
  const credentials = await readCredentials();
  const filteredCredentials: Credential[] = credentials.filter(
    (credential) => credential.service !== service
  );
  const updatedCredential: Credential[] = [...filteredCredentials, credential];
  await overwriteDB(updatedCredential);
}

export async function overwriteDB(credential: Credential[]): Promise<void> {
  const database: DB = {
    credentials: credential,
  };
  await writeFile('./src/db.json', JSON.stringify(database, null, 2));
}
