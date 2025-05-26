import { useState } from "react";
import NotesList from "./assets/components/NotesList";
import { NotesContext } from "./NotesContext";

const App = () => {
    const [notes, setNotes] = useState([""])
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
}
    return (
        <NotesContext.Provider value={{ notes, setNotes }}>
            <div>
                {toggleDarkMode}
                <h2>tank({notes.length})</h2>
                <NotesList />
            </div>
        </NotesContext.Provider>
    )
}
export default App;
