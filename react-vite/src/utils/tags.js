import syn from "synonyms";

export async function getTags() {
  const response = await fetch(`/api/tags`);
  const data = await response.json();
  const processedData = data.map((e) => ({
    value: e.id,
    label: e.name,
    tags: e.name.toLowerCase(), // syn(e.name.toLowerCase(), "v"),
  }));
  return processedData;
}

// const synonymFilter = (options, search) => {
//   return options.filter((option) =>
//     option.tags.some((tag) => tag.includes(search.toLowerCase()))
//   );
// };
