import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'
type ColorTheme = 'slate' | 'blue' | 'purple' | 'green' | 'orange'

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  colorTheme: 'slate',
  setColorTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorTheme = 'slate',
  storageKey = 'vite-ui-theme',
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColorTheme?: ColorTheme
  storageKey?: string
}) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () =>
      (localStorage.getItem(`${storageKey}-color`) as ColorTheme) ||
      defaultColorTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    const themes = ['theme-blue', 'theme-purple', 'theme-green', 'theme-orange']
    root.classList.remove(...themes)

    if (colorTheme !== 'slate') {
      root.classList.add(`theme-${colorTheme}`)
    }
  }, [colorTheme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    colorTheme,
    setColorTheme: (newColorTheme: ColorTheme) => {
      localStorage.setItem(`${storageKey}-color`, newColorTheme)
      setColorTheme(newColorTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
