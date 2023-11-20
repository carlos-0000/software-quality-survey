import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { GlobalTheme } from '@carbon/react';

type ThemeType = Exclude<
  React.ComponentProps<typeof GlobalTheme>['theme'],
  undefined
>;
type ContextType = {
  theme: ThemeType;
  toggleTheme: (theme: ThemeType) => void;
};

const defaultContext: ContextType = {
  theme: 'g100',
  toggleTheme: () => {
    /* Comment for avoid eslint error for empty function */
  },
};

export const themeContext = createContext<ContextType>(defaultContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(defaultContext.theme);

  const toggleTheme = useCallback((theme: ThemeType) => {
    setTheme(theme);
  }, []);

  const contextValues = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <themeContext.Provider value={contextValues}>
      <GlobalTheme theme={theme}>{children}</GlobalTheme>
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(themeContext);
  return { theme, toggleTheme };
};
