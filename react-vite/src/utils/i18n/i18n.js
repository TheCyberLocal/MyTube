// i18n.js
import en from "./lib/en";
import es from "./lib/es";

const translations = {
  en,
  es,
};

export function getTranslation(lang) {
  return (phrase, arg) => {
    const string = translations["es" ?? "en"][phrase];
    if (!string) return `!!PROBLEM!! ${phrase}`;
    return string.replace("{var}", arg);
  };
}
