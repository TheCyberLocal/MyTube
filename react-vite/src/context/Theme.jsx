import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useSelector((state) => state.session);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const userTheme = user?.theme || "light";
    setTheme(userTheme);

    document.body.className = `${userTheme}-theme`;
  }, [user, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
