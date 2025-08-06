"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}

// Premium theme context for advanced theming
interface PremiumThemeContextType {
    isPremium: boolean
    accentColor: string
    gradientType: 'primary' | 'secondary' | 'accent'
}

const PremiumThemeContext = React.createContext<PremiumThemeContextType>({
    isPremium: true,
    accentColor: '#e84fe3',
    gradientType: 'primary'
})

export function PremiumThemeProvider({ children }: { children: React.ReactNode }) {
    const themeState = React.useMemo<PremiumThemeContextType>(() => ({
        isPremium: true,
        accentColor: '#e84fe3',
        gradientType: 'primary'
    }), [])

    return (
        <PremiumThemeContext.Provider value={themeState}>
            {children}
        </PremiumThemeContext.Provider>
    )
}

export const usePremiumTheme = () => React.useContext(PremiumThemeContext) 