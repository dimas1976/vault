import { readFile } from 'fs/promises';

async function readPasswords() {
  try {
    console.log(await readFile('./src/db.json', 'utf-8'));
  } catch (error) {
    console.error('there was an error:', error.message);
  }
}

readPasswords();
