'use client';

import styles from "./link-table.module.css";
import { Link } from "../types/link";

const LinkActions = ({ link, onClick }: { link: Link, onClick: () => void }) => (
    <div className={styles.linkActions}>
        <a href={link.url} target="_blank" title="Acessar link">
            🔗
        </a>
        <button onClick={onClick} type="button" title="Remover link">
            ✖️
        </button>
    </div>
);

const LinkTable = ({ linkData, onDelete }: { linkData: Link[], onDelete: (id: number) => void}) => (
    <table className={styles.linkTable}>
        <tbody>
            {linkData.map(link => (
                <tr key={link.url}>
                    <td>{link.url}</td>
                    <td><LinkActions link={link} onClick={() => onDelete(link.id)} /></td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default LinkTable;
