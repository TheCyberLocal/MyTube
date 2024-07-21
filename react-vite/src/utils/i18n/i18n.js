async function loadTranslation(lang) {
  try {
    const module = await import(`./lib/${lang}`);
    return module.default;
  } catch {
    const fallbackModule = await import(`./lib/en`);
    return fallbackModule.default;
  }
}

export async function getTranslation(lang) {
  const translations = await loadTranslation(lang || "en");
  return (phrase, arg) => {
    return translations[phrase].replace("{var}", arg);
  };
}

// Arabic ar
// Bengali bn
// English en
// French fr
// German de
// Hindi hi
// Indonesian id
// Italian it
// Japanese ja
// Korean ko
// Malay ms
// Mandarin zh
// Polish pl
// Portuguese pt
// Russian ru
// Spanish es
// Thai th
// Turkish tr
// Urdu ur
// Vietnamese vi
