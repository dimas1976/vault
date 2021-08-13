import CryptoJS from 'crypto-js';
import { Credential } from '../types';

export function encryptCredential(
  credential: Credential,
  key: string
): Credential {
  const encryptedCredentialPass = CryptoJS.TripleDES.encrypt(
    credential.password,
    key
  ).toString();

  const partiallyEncryptedCredential = {
    ...credential,
    password: encryptedCredentialPass,
  };

  return partiallyEncryptedCredential;
}

export function decryptCredential(
  credential: Credential,
  key: string
): Credential {
  const decryptedPass = CryptoJS.TripleDES.decrypt(
    credential.password,
    key
  ).toString(CryptoJS.enc.Utf8);

  const partiallyDecryptedCredential = {
    ...credential,
    password: decryptedPass,
  };

  return partiallyDecryptedCredential;
}
