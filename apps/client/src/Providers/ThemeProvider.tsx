import * as React from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeContextType = {
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
};

const initialState: ThemeContextType = {
  theme: 'system',
  onSetTheme: (_theme) => null,
};

export const ThemeContext = React.createContext<ThemeContextType>(initialState);

type Props = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: Props) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const onSetTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, onSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
