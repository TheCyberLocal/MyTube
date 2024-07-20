// English en
// Spanish es
// Portuguese pt
// French fr
// German de
// Italian it
// Japanese ja
// Korean ko
// Mandarin zh
// Russian ru
// Arabic ar
// Hindi hi
// Bengali bn
// Indonesian id
// Malay ms
// Thai th
// Vietnamese vi
// Turkish tr
// Polish pl

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
