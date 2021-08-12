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

export function decryptCredential(credential: Credential): Credential {
  const decryptedPass = CryptoJS.TripleDES.decrypt(
    credential.password,
    'neuefische'
  ).toString(CryptoJS.enc.Utf8);

  const partiallyDecryptedCredential = {
    ...credential,
    password: decryptedPass,
  };

  return partiallyDecryptedCredential;
}
