import React from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterpassword] = useState('');
  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: masterPassword,
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    if (!masterPassword) {
      setCredentials([]);
    }
    fetchCredentials();
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1>Dashboard</h1>
      <p>Insert your passwort</p>
      <Link to="service/marwin">Zu Marwin</Link>
      <input
        type="password"
        value={masterPassword}
        onChange={(event) => setMasterpassword(event.target.value)}
      />
      <div>
        {credentials.length !== 0 &&
          credentials.map((credential) => (
            <CredentialCard credential={credential} />
          ))}
      </div>
    </main>
  );
}
