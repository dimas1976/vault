import { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCollection } from './database';
import { getCredentialCollection } from './database';

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const encryptedCredentials = await credentialCollection.find().toArray();
  const credentials = encryptedCredentials.map((credential) =>
    decryptCredential(credential, key)
  );
  return credentials;
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
  const savedCredential = await getCollection('credential').insertOne(
    encryptedCredential
  );
  const id = savedCredential.insertedId.toString();
  return id;
}

export async function deleteCredential(service: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service });
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const credentialCollection = getCredentialCollection();

  const encryptedCredential = encryptCredential(credential, key);

  await credentialCollection.updateOne(
    { service },
    { $set: encryptedCredential }
  );
}
