import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../store/slices/settingsSlice";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { settings } = useSelector(state => state);

    const toggleDarkMode = (is_active) => {
        dispatch(setDarkMode(is_active));

        if (!settings.darkMode) document.body.classList.add("dark");
        else document.body.classList.remove("dark");
    }

    useEffect(() => {
        if (settings.darkMode) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, toggleDarkMode }}>
            {children}
        </SettingsContext.Provider>
    )
}