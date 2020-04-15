import React from 'react';
import styles from './styles.module.css';

export default function Button({ type, action , children, cy = 'button' }){
  return (
    <button
      data-cy={cy}
      className={styles[type]}
      onClick={() => {
        action();
      }}
    >
      {children}
    </button>
  );
}