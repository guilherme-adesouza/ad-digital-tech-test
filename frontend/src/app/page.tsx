'use client';

import { FormEvent, useEffect, useState } from "react";
import LinkForm from "./components/LinkForm";
import LinkTable from "./components/LinkTable";
import styles from "./page.module.css";
import { Link } from "./types/link";
import LinkService from "./services/LinkService";

const CREATION_ERRORS = {
  400: 'URL não pertence ao Youtube',
  422: 'Link já cadastrado',
  500: 'Ocorreu um erro inesperado, tente novamente',
}

function getErrorMessage(statusCode: number) {
  return CREATION_ERRORS[statusCode as keyof typeof CREATION_ERRORS] || CREATION_ERRORS[500]
}


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
      alert(getErrorMessage(result.status || 500));
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
