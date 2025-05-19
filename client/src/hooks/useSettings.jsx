import { useContext } from "react"
import { SettingsContext } from "../providers/settings";

/**
 * Use settings context with shared functions
 * @returns {{
 *  settings: { darkMode: boolean },
 *  toggleDarkMode: (is_active: boolean) => void,
 * }}
 */
export const useSettings = () => {
    return useContext(SettingsContext);
}