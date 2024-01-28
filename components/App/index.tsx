import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/my-jarvis">
          <a>My Jarvis</a>
        </Link>
      </nav>
      <main>
        <h1>Welcome to Speak Smart Next.js Frontend!</h1>
      </main>
    </div>
  );
};

export default App;