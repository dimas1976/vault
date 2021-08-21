import React, { useState } from 'react';
import styles from './SearchCredentialPage.module.css';

export default function SearchCredentialPage(): JSX.Element {
  const [service, setServiceName] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  return (
    <main className={styles['search-credential']}>
      <h2>Add new Credential</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
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
