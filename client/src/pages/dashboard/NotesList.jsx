import { useContext, useState } from "react"
import { NotesContext } from "../../providers/NotesContext";
import CustomButton from "../../components/shared/CustomButton";
const NotesList = () => {
    const { notes, setNotes } = useContext(NotesContext);
    const [noteTitle, setNoteTitle] = useState("")
    
    return (
        <>
            <div>
            
            <CustomButton className=" flex flex-col border-1" onClick={() => setNotes([...notes, noteTitle])}>Add tank </CustomButton>
            <input className="border border-neutral-300 rounded-md px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent" type="text" placeholder="My new tank.."
                onChange={(e) => setNoteTitle(e.target.value)} value={noteTitle} />
            </div>
        </>
    )
}
export default NotesList
//<p></p>
  //          <pre>{JSON.stringify(notes)}</pre>
