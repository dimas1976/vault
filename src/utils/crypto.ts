import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptCredential(credential: Credential): Credential {
  const encryptedCredentialPass = CryptoJS.TripleDES.encrypt(
    credential.password,
    'neuefische'
  ).toString();

  const partiallyEncryptedCredential = {
    ...credential,
    password: encryptedCredentialPass,
  };

  return partiallyEncryptedCredential;
}
