import React from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Dashboard</h1>
      <p>Insert your passwort</p>
      <Link to="/marwin">Zu Marwin</Link>
      <input type="text" />
      <div></div>
    </main>
  );
}
