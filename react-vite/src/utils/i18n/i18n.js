const dynamicModules = {
  ar: import("./lib/ar"),
  bn: import("./lib/bn"),
  de: import("./lib/de"),
  en: import("./lib/en"),
  es: import("./lib/es"),
  fr: import("./lib/fr"),
  hi: import("./lib/hi"),
  id: import("./lib/id"),
  it: import("./lib/it"),
  ja: import("./lib/ja"),
  ko: import("./lib/ko"),
  ms: import("./lib/ms"),
  pl: import("./lib/pl"),
  pt: import("./lib/pt"),
  ru: import("./lib/ru"),
  th: import("./lib/th"),
  tr: import("./lib/tr"),
  ur: import("./lib/ur"),
  vi: import("./lib/vi"),
  zh: import("./lib/zh"),
};

async function loadTranslation(lang) {
  try {
    const module = await dynamicModules[lang];
    return module.default;
  } catch {
    const fallbackModule = await dynamicModules["en"];
    return fallbackModule.default;
  }
}

export async function getTranslation(lang) {
  const translations = await loadTranslation(lang);
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
