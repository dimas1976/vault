import React from 'react';
import styles from './NewCredentialPage.module.css';

export default function NewCredentialPage(): JSX.Element {
  return (
    <main className={styles['new-credential']}>
      <h2>Add new Credential</h2>
      <form className={styles['new-credential__form']}>
        <input type="text" placeholder="service name" />
        <input type="text" placeholder="user name" />
        <input type="text" placeholder="password" />
        <input type="text" placeholder="master password" />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
