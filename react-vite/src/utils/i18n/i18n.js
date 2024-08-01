const dynamicModules = {
  ar: import("./lib/ar"), // Arabic
  bn: import("./lib/bn"), // Bengali
  de: import("./lib/de"), // German
  en: import("./lib/en"), // English
  es: import("./lib/es"), // Spanish
  fr: import("./lib/fr"), // French
  hi: import("./lib/hi"), // Hindi
  id: import("./lib/id"), // Indonesian
  it: import("./lib/it"), // Italian
  ja: import("./lib/ja"), // Japanese
  ko: import("./lib/ko"), // Korean
  ms: import("./lib/ms"), // Malay
  pl: import("./lib/pl"), // Polish
  pt: import("./lib/pt"), // Portuguese
  ru: import("./lib/ru"), // Russian
  th: import("./lib/th"), // Thai
  tr: import("./lib/tr"), // Turkish
  ur: import("./lib/ur"), // Urdu
  vi: import("./lib/vi"), // Vietnamese
  zh: import("./lib/zh"), // Chinese
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
