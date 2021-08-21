import React, { useState } from 'react';
import styles from './NewCredentialPage.module.css';

export default function NewCredentialPage(): JSX.Element {
  const [service, setServiceName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  async function sendNewCredentialToAPI() {
    const newCredential = { service, username, password };
    console.log(newCredential);
    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        Authorization: masterPassword,
      },
      body: JSON.stringify(newCredential),
    });
  }
  return (
    <main className={styles['new-credential']}>
      <h2>Add new Credential</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendNewCredentialToAPI();
        }}
        className={styles['new-credential__form']}
      >
        <input
          type="text"
          placeholder="service name"
          value={service}
          onChange={(event) => setServiceName(event.target.value)}
        />
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="master password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
