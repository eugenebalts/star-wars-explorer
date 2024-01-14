export default function getIdFromUrl(url, searchingPath) {
  const parts = url.split('/');
  const idMap = {};

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (/\d+/.test(part)) {
      const path = parts[i - 1];
      if (!idMap[path]) {
        idMap[path] = [];
      }
      idMap[path].push(part);
    }
  }

  return idMap[searchingPath];
}
