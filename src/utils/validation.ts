import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validateMasterPasswort(
  passwort: string
): Promise<boolean> {
  const hashedMasterPass = await readFile('./src/utils/.password', 'utf-8');
  const hashedPass = CryptoJS.SHA256(passwort).toString();
  return hashedMasterPass === hashedPass;
}
