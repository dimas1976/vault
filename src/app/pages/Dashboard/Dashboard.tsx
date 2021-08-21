import React from 'react';
import { mdiMagnify, mdiPlusCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterpassword] = useState('');
  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials: Credential[] = await response.json();
    setCredentials(credentials);
  }
  // useEffect(() => {
  //   async function fetchCredentials() {
  //     const response = await fetch('/api/credentials', {
  //       headers: {
  //         Authorization: masterPassword,
  //       },
  //     });
  //     const credentials = await response.json();
  //     setCredentials(credentials);
  //   }
  //   if (!masterPassword) {
  //     setCredentials([]);
  //   }
  //   fetchCredentials();
  // }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1>Dashboard</h1>
      <p>Insert your passwort</p>
      <Link to="service/marwin">Zu Marwin</Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          type="password"
          value={masterPassword}
          onChange={(event) => {
            setMasterpassword(event?.target.value);
          }}
        />
        <button type="submit">Senden</button>
      </form>
      <section className={styles.credentials}>
        {credentials.length !== 0 &&
          credentials.map((credential) => (
            <CredentialCard credential={credential} key={credential._id} />
          ))}
        <div className={styles.credentials__buttons}>
          <Link to="/search">
            <Icon className={styles.icon} path={mdiMagnify} />
          </Link>
          <Link to="/add">
            <Icon className={styles.icon} path={mdiPlusCircleOutline} />
          </Link>
        </div>
      </section>
    </main>
  );
}
