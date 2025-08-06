export const ThemeConfig = {
    // Premium Color Palette
    colors: {
        // Primary gradient colors
        primary: {
            from: '#e84fe3', // Pink
            to: '#8338ec',   // Purple
            via: '#a855f7'   // Intermediate
        },

        // Background colors
        background: {
            primary: '#0a0a0a',    // Deep black
            secondary: '#1a1a1a',  // Dark grey
            tertiary: '#2d2d2d',   // Medium grey
            card: '#1f1f1f',       // Card background
            sidebar: '#0f0f0f'     // Sidebar background
        },

        // Text colors
        text: {
            primary: '#ffffff',     // White
            secondary: '#e5e5e5',   // Light grey
            tertiary: '#a3a3a3',   // Medium grey
            muted: '#6b7280',      // Muted grey
            accent: '#e84fe3'       // Accent pink
        },

        // Border colors
        border: {
            primary: '#333333',     // Dark border
            secondary: '#404040',   // Medium border
            accent: '#e84fe3',      // Accent border
            muted: '#262626'        // Muted border
        },

        // Status colors
        status: {
            success: '#10b981',     // Green
            warning: '#f59e0b',     // Yellow
            error: '#ef4444',       // Red
            info: '#3b82f6'         // Blue
        },

        // Chart colors
        chart: {
            primary: '#e84fe3',
            secondary: '#8338ec',
            tertiary: '#a855f7',
            quaternary: '#c084fc',
            quinary: '#d8b4fe'
        }
    },

    // Typography
    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem'
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800'
        }
    },

    // Spacing
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem'
    },

    // Border radius
    borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none'
    },

    // Gradients
    gradients: {
        primary: 'linear-gradient(135deg, #e84fe3 0%, #8338ec 100%)',
        secondary: 'linear-gradient(135deg, #a855f7 0%, #e84fe3 100%)',
        accent: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
        dark: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        card: 'linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%)'
    },

    // Animations
    animations: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }
}

// CSS Variables for easy access
export const CSSVariables = {
    '--color-primary-from': ThemeConfig.colors.primary.from,
    '--color-primary-to': ThemeConfig.colors.primary.to,
    '--color-background-primary': ThemeConfig.colors.background.primary,
    '--color-background-secondary': ThemeConfig.colors.background.secondary,
    '--color-text-primary': ThemeConfig.colors.text.primary,
    '--color-text-secondary': ThemeConfig.colors.text.secondary,
    '--color-border-primary': ThemeConfig.colors.border.primary,
    '--color-border-accent': ThemeConfig.colors.border.accent,
    '--gradient-primary': ThemeConfig.gradients.primary,
    '--gradient-secondary': ThemeConfig.gradients.secondary,
    '--gradient-card': ThemeConfig.gradients.card
}

// Utility functions
export const getGradientClass = (type: 'primary' | 'secondary' | 'accent' | 'dark' | 'card') => {
    const gradients = {
        primary: 'bg-gradient-to-br from-pink-500 to-purple-600',
        secondary: 'bg-gradient-to-br from-purple-500 to-pink-500',
        accent: 'bg-gradient-to-br from-purple-400 to-purple-600',
        dark: 'bg-gradient-to-br from-gray-800 to-gray-900',
        card: 'bg-gradient-to-br from-gray-900 to-gray-800'
    }
    return gradients[type]
}

export const getStatusColor = (status: 'success' | 'warning' | 'error' | 'info') => {
    return ThemeConfig.colors.status[status]
}

export const getTextColor = (type: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'accent') => {
    return ThemeConfig.colors.text[type]
} 