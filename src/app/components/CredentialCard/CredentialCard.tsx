import { mdiPencil, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import type { Credential } from '../../../types';
import styles from './CredentialCard.module.css';
import { Link } from 'react-router-dom';

type CredentialCardProps = {
  credential: Credential;
  onDeleteClick: (credential: Credential) => void;
};
export default function CredentialCard({
  credential,
  onDeleteClick,
}: CredentialCardProps): JSX.Element {
  return (
    <article className={styles.credential}>
      <h2>{credential.service}</h2>
      <div className={styles.content}>
        <div className={styles.content__data}>
          <p>{credential.username}</p>
          <p>{credential.password}</p>
        </div>
        <div className={styles.content__buttons}>
          <Link to={`/credential/${credential.service}/edit`}>
            <Icon className={styles.icon} path={mdiPencil} />
          </Link>
          <button
            onClick={() => {
              onDeleteClick(credential);
            }}
          >
            <Icon className={styles.icon} path={mdiDelete} />
          </button>
        </div>
      </div>
    </article>
  );
}
