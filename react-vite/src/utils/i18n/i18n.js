// i18n.js
async function loadTranslation(lang) {
  try {
    const module = await import(`./lib/${lang}`);
    return module.default;
  } catch (error) {
    const fallbackModule = await import(`./lib/en`);
    return fallbackModule.default;
  }
}

export async function getTranslation(lang) {
  const translations = await loadTranslation(lang || "en");
  return (phrase, arg) => {
    const string = translations[phrase];
    if (!string) return `!!PROBLEM!! ${phrase}`;
    return string.replace("{var}", arg);
  };
}
