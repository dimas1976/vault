import React, { useState } from 'react';
import { Credential } from '../../../types';
import styles from './SearchCredentialPage.module.css';

export default function SearchCredentialPage(): JSX.Element {
  const [service, setServiceName] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  async function getCredential(): Promise<void> {
    const response = await fetch(`/api/credentials/${service}`, {
      headers: {
        Authorization: masterPassword,
      },
    });
    const searchedCredential: Credential = await response.json();
    window.location.href = `/credential/${searchedCredential._id}`;
  }
  return (
    <main className={styles['search-credential']}>
      <h2>Search For Credential</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getCredential();
        }}
        className={styles['search-credential__form']}
      >
        <input
          type="text"
          placeholder="service name"
          value={service}
          onChange={(event) => setServiceName(event.target.value)}
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
