import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NewCredentialPage.module.css';

export default function NewCredentialPage(): JSX.Element {
  const [service, setServiceName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');
  const history = useHistory();

  async function sendNewCredentialToAPI() {
    const newCredential = { service, username, password };
    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterPassword,
      },
      body: JSON.stringify(newCredential),
    });
    history.push('/');
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
          required
        />
        <input
          type="text"
          placeholder="user name"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="master password"
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
