'use client';

import { Link } from "../types/link";

const LinkActions = ({ link, onClick }: { link: Link, onClick: () => void }) => (
    <div>
        <a href={link.url} target="_blank">
            Acessar
        </a>
        <button onClick={onClick} type="button">
            Remover
        </button>
    </div>
);

const LinkTable = ({ linkData, onDelete }: { linkData: Link[], onDelete: (id: number) => void}) => (
    <table>
        <thead>
            <tr>
                <th>Link</th>
            </tr>
            <tr></tr>
        </thead>
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
