import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NewCredentialPage.module.css';
import { sendNewCredentialToAPI } from '../../../utils/api';

export default function NewCredentialPage(): JSX.Element {
  const [service, setServiceName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [masterPassword, setMasterPassword] = useState<string>('');
  const history = useHistory();

  return (
    <main className={styles['new-credential']}>
      <h2>Add new Credential</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newCredential = { service, username, password };
          sendNewCredentialToAPI(newCredential, masterPassword);
          history.push('/');
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
