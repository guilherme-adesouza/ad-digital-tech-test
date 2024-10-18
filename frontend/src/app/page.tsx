'use client';

import { FormEvent, useEffect, useState } from "react";
import LinkForm from "./components/LinkForm";
import LinkTable from "./components/LinkTable";
import styles from "./page.module.css";
import { Link } from "./types/link";
import LinkService from "./services/LinkService";


export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks(): Promise<void> {
    const result = await LinkService.getAll();
    if (result) {
      setLinks(result.data);
    }
  }

  async function createLink(event: FormEvent<any>): Promise<void> {
    event.preventDefault();
    const link = event.currentTarget[0].value;
    const result = await LinkService.create(link);
    if (!result) {
      alert('Erro ao criar o link, tente novamente.');
    } else {
      await fetchLinks();
    }
  }
  
  async function deleteLink(id: number) {
    const result = await LinkService.removeById(id);
    if (!result) {
      alert('Erro ao deletar link, tente novamente.');
    } else {
      await fetchLinks();
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LinkForm onSubmit={createLink}/>
        <LinkTable linkData={links} onDelete={deleteLink}/>
      </main>
      <footer className={styles.footer}>
        Criado por Guilherme Augusto de Souza
      </footer>
    </div>
  );
}
