import React from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <p>Insert your passwort</p>
        <input type="text" />
        <div></div>
      </div>
    </>
  );
}
