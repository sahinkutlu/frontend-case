const baseURL = "https://rickandmortyapi.com";

export function getOptions(name: string) {
  const url = new URL("/api/character", baseURL);
  url.searchParams.append("page", "1");
  url.searchParams.append("name", name);

  return fetch(url);
}
