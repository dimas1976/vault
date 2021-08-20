import React from 'react';
import type { Credential } from '../../../types';

type CredentialCardProps = {
  credential: Credential;
};
export default function CredentialCard({
  credential,
}: CredentialCardProps): JSX.Element {
  return (
    <div>
      <p>{credential.service}</p>
      <p>{credential.username}</p>
      <p>{credential.password}</p>
    </div>
  );
}
