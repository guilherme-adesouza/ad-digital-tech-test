'use client';

import { FormEvent, useEffect, useState } from "react";
import LinkForm from "./components/LinkForm";
import LinkTable from "./components/LinkTable";
import styles from "./page.module.css";
import { Link } from "./types/link";
import LinkService from "./services/LinkService";


export default function Home() {
  const [links, setLinks] = useState<Link[]|null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks(): Promise<void> {
    const result = await LinkService.getAll();
    if (result.data) {
      setLinks(result.data);
      return;
    }
    setLinks([]);
  }

  async function createLink(event: FormEvent<any>): Promise<any> {
    event.preventDefault();
    const link = event.currentTarget[0].value;
    const result = await LinkService.create(link);
    if (result.error) {
      alert(result.status === 422 ? 
        'Link já cadastrado'
        :  'Erro ao criar o link, tente novamente');
    } else {
      await fetchLinks();
      event.target.reset();
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
      <h1 className={styles.title}>Link Keeper</h1>
      <main className={styles.main}>
        <LinkForm onSubmit={createLink}/>
        {!links ? 
          <div className={styles.loading}>Carregando...</div> : 
          <LinkTable linkData={links} onDelete={deleteLink}/>
        }
      </main>
    </div>
  );
}
