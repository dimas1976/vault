import { Collection, MongoClient } from 'mongodb';
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

export function getCollection<T>(name: string): Collection<T> {
  return client.db().collection<T>(name);
}

export function getCredentialCollection(): Collection<Credential> {
  return getCollection<Credential>('credentials');
}
