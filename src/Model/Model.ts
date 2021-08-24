import { Credential } from '../types';

let credentialModel: Credential[] = [
  {
    service: '',
    username: '',
    password: '',
  },
];

export function getCredentialModel(): Credential[] {
  return credentialModel.slice();
}

export function setCredentialModel(credentials: Credential[]): void {
  credentialModel = credentials;
}
