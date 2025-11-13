const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function getAll(query) {
  try {
    const url = query ? `${BASE_URL}/?name=${encodeURIComponent(query)}` : BASE_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch characters");
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    throw error;
  }
}

export async function getById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Character not found");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default { getAll, getById };
