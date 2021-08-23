import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Credential } from '../../../types';
import styles from './EditCredentialPage.module.css';

export default function EditCredentialPage(): JSX.Element {
  const { serviceName }: { serviceName: string } = useParams();
  const [service, setServiceName] = useState(serviceName);
  const [username, setUserName] = useState(username);
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [credential, setCredential] = useState(null);

  return (
    <main className={styles['new-credential']}>
      <h2>Edit new Credential</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateCredential();
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
  async function updateCredential(): Promise<void> {
    const updatingCredential: Credential = {
      service,
      username,
      password,
    };
    await fetch(`/api/credentials/${serviceName}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: masterPassword,
      },
      body: JSON.stringify(updatingCredential),
    });
  }
}
