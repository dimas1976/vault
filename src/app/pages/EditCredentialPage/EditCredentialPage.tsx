import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredentialModel } from '../../../Model/Model';
import { Credential } from '../../../types';
import { updateCredentialInDB } from '../../../utils/api';
import styles from './EditCredentialPage.module.css';

export default function EditCredentialPage(): JSX.Element {
  const { serviceName }: { serviceName: string } = useParams();
  const [service, setServiceName] = useState(serviceName);
  const [credential, setCredential] = useState<Credential | undefined>();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');

  //Fehler--> Nach useEffect kein Rendering!!!
  useEffect(() => {
    const credentials: Credential[] = getCredentialModel();
    console.log(credentials);
    const filteredCredential = credentials.find(
      (credential) => (credential.service = serviceName)
    );
    if (!filteredCredential) {
      throw new Error('');
    }

    setCredential(filteredCredential);
    console.log(filteredCredential);
    setUserName(filteredCredential.username);
    setPassword(filteredCredential.password);
  }, [credential]);

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
    await updateCredentialInDB(serviceName, masterPassword, updatingCredential);
  }
}
