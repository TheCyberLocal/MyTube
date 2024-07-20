export async function getTags() {
  const response = await fetch(`/api/tags`);
  const data = await response.json();
  const processedData = data.map((e) => ({
    value: e.id,
    label: e.name,
  }));
  return processedData;
}
