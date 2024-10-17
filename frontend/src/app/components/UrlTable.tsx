'use client';

import { Link } from "../types/link";

const UrlActions = ({ link, onClick }: { link: Link, onClick: () => void }) => (
    <div>
        <a href={link.url} target="_blank">
            Acessar
        </a>
        <button onClick={onClick} type="button">
            Remover
        </button>
    </div>
);

const UrlTable = ({ linkData }: { linkData: Link[] }) => (
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
                    <td><UrlActions link={link} onClick={() => alert('delete')} /></td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default UrlTable;
