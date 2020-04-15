import React from 'react';
import styles from './styles.module.css';

export default function CloseButton({ action }) {
  return (
    <button
      onClick={action}
      className={styles.button}
    >
      X
    </button>
  );
}