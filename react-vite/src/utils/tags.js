import { getTranslation } from "./i18n";

export async function getTags(lang) {
  const response = await fetch(`/api/tags`);
  const data = await response.json();

  const translate = await getTranslation(lang);

  return data.map((e) => ({
    value: e.id,
    label: translate(e.name),
  }));
}
