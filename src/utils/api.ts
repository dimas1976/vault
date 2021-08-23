import { Credential } from '../types';

export async function sendNewCredentialToAPI(
  credential: Credential,
  masterPassword: string
): Promise<void> {
  await fetch('/api/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: masterPassword,
    },
    body: JSON.stringify(credential),
  });
}
