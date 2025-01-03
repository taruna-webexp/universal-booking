"use client"
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for dark mode preference on initial load
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleThemeChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleThemeChange);

        return () => darkModeQuery.removeEventListener('change', handleThemeChange);
    }, []);

    return <div className={isDarkMode ? 'dark' : ''}>{children}</div>;
}
