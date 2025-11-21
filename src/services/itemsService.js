const API_URL = 'https://swapi.dev/api/people';

let currentPage = 1;
let hasNextPage = true;

export async function fetchCharacters(page = 1) {
    const url = `${API_URL}/?page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    currentPage = page;
    hasNextPage = !!json.next;

    return json.results;
}

export async function fetchNextPage() {
    if (!hasNextPage) return [];
    return fetchCharacters(currentPage + 1);}

export function resetPagination() {
    currentPage = 1;
    hasNextPage = true;
}

export async function getById(id) {
    if (!id) throw new Error("No id provided");
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Character ${id} not found`);
    return res.json();
}

