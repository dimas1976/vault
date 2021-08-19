import { useParams } from 'react-router-dom';
import React from 'react';

export default function Password(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return (
    <main>
      <h2>Mein Passwort ist {service}</h2>
    </main>
  );
}
