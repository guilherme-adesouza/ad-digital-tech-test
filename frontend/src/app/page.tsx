'use client';

import { FormEvent } from "react";
import UrlForm from "./components/UrlForm";
import UrlTable from "./components/UrlTable";
import styles from "./page.module.css";
import { Link } from "./types/link";

const mock: Link[] = [
  { id: 1, url: 'https://www.youtube.com/gaules' },
  { id: 2, url: 'https://www.youtube.com/' },
  { id: 3, url: 'https://youtu.be/s8EfR1YvYnM' },
  { id: 4, url: 'https://www.youtube.com/shorts/BrWUeXTSOSU' },
];

export default function Home() {
  function onSubmit(event: FormEvent<any>): void {
    event.preventDefault();
    console.log(event.currentTarget[0].value);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <UrlForm onSubmit={onSubmit}/>
        <UrlTable linkData={mock}/>
      </main>
      <footer className={styles.footer}>
        Criado por Guilherme Augusto de Souza
      </footer>
    </div>
  );
}
