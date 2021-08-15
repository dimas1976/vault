import { MongoClient } from 'mongodb';
import type { Credential } from '../types';

let client: MongoClient;

export async function connectToDataBase(url: string): Promise<void> {
  client = new MongoClient(url);

  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
}

export async function addCredentialToDB(
  credential: Credential
): Promise<string> {
  const savedCredential = await client
    .db('vault')
    .collection('credentials')
    .insertOne(credential);
  const id = savedCredential.insertedId.toString();
  return id;
}

export async function getCredentialFromDB(
  nameOfService: string
): Promise<Credential> {
  const credential: Credential = await client
    .db('vault')
    .collection<T>('credentials') //<Credential> don't work
    .findOne({ service: nameOfService });

  if (!credential) {
    throw new Error(`No credential from service ${nameOfService}`);
  }

  return credential;
}

export async function getAllCredentialsFromDB(): Promise<Credential[]> {
  const result = client.db('vault').collection<T>('credentials').find();
  return await result.toArray();
}

export async function deleteCredentialFromDB(
  nameOfService: string
): Promise<Credential> {
  const result = client
    .db('vault')
    .collection<T>('credentials')
    .findOneAndDelete({ service: nameOfService });

  return (await result).value;
}

export async function replaceCredentialDB(
  nameOfService: string,
  replacingCredential: Credential
) {
  const result = await client
    .db('vault')
    .collection<T>('credentials')
    .findOneAndReplace({ service: nameOfService }, replacingCredential);
  console.log(result);
}
