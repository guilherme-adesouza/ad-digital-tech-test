const API_URL = process.env['NEXT_PUBLIC_API_URL'] || 'localhost:9090';

const apiFetch = async (route: string, options?: RequestInit) => {
    try {
        const response = await fetch(`${API_URL}${route}`, options);
        if (!response.ok) {
            return { error: true, status: response.status };
        }
        const json = await response.json();
        return { data: json };
    } catch (error: any) {
        console.error(error.message);
        return { error, status: 500 };
    }
}

const LinkService = {
    getAll: () => apiFetch('/links'),
    create: (url: string) => apiFetch('/links', { 
        method: 'POST', 
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
    }),
    removeById: (id: number) => apiFetch(`/links/${id}`, { method: 'DELETE'}),
}

export default LinkService;