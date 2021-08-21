import { mdiPencil, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import type { Credential } from '../../../types';
import styles from './CredentialCard.module.css';
import { Link } from 'react-router-dom';

type CredentialCardProps = {
  credential: Credential;
};
export default function CredentialCard({
  credential,
}: CredentialCardProps): JSX.Element {
  async function deleteCredential() {
    await fetch(`/api/credentials/${credential.service}`, {
      method: 'DELETE',
    });
  }
  return (
    <article className={styles.credential}>
      <h2>{credential.service}</h2>
      <div className={styles.content}>
        <div className={styles.content__data}>
          <p>{credential.username}</p>
          <p>{credential.password}</p>
        </div>
        <div className={styles.content__buttons}>
          <Link to="">
            <Icon className={styles.icon} path={mdiPencil} />
          </Link>
          <Link
            to=""
            onClick={() => {
              deleteCredential();
            }}
          >
            <Icon className={styles.icon} path={mdiDelete} />
          </Link>
        </div>
      </div>
    </article>
  );
}
