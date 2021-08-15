import { DB, Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import {
  addCredentialToDB,
  getCredentialFromDB,
  getAllCredentialsFromDB,
  deleteCredentialFromDB,
  replaceCredentialDB,
} from './database';

export async function readCredentials(
  masterPassword: string
): Promise<Credential[]> {
  const credentials: Credential[] = await getAllCredentialsFromDB();
  return credentials.map((credential) =>
    decryptCredential(credential, masterPassword)
  );
}

export async function getCredential(
  service: string,
  masterPass: string
): Promise<Credential> {
  const filteredCredential: Credential = await getCredentialFromDB(service);
  return decryptCredential(filteredCredential, masterPass);
}

export async function addCredential(
  credential: Credential,
  masterPass: string
): Promise<string> {
  const encryptedCredential = encryptCredential(credential, masterPass);
  return addCredentialToDB(encryptedCredential);
}

export async function deleteCredential(service: string): Promise<Credential> {
  const deletedCredential = await deleteCredentialFromDB(service);
  if (!deletedCredential) {
    throw new Error(`Credential with name ${service} could not deleted`);
  }
  return deletedCredential;
}

export async function updateCredential(
  service: string,
  credential: Credential,
  masterPassword: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, masterPassword);
  await replaceCredentialDB(service, encryptedCredential);
}

export async function overwriteDB(credential: Credential[]): Promise<void> {
  const database: DB = {
    credentials: credential,
  };
  await writeFile('./src/db.json', JSON.stringify(database, null, 2));
}
