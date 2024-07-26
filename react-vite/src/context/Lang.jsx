import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getTranslation } from "../utils";
import { useSelector } from "react-redux";

// Context and provider setup
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const { user } = useSelector((state) => state.session);
  const [getTranslationFunc, setGetTranslationFunc] = useState(() => () => "");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLanguage = user?.language || "en";
    setLang(userLanguage);
  }, [user, setLang]);

  useEffect(() => {
    getTranslation(lang).then((func) => setGetTranslationFunc(() => func));
  }, [lang]);

  const t = useCallback(
    (phrase, arg) => getTranslationFunc(phrase, arg),
    [getTranslationFunc]
  );

  return (
    <TranslationContext.Provider value={{ t, setLang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
