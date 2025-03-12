import { useContext } from "react";
import {NotesContext} from "./NotesProvider";

function NotesList() {
    let {notes, deleteNote, updateNote} = useContext(NotesContext)
    return (
        <>
            <ol>
                {
                    notes.map((note, idx)=>(
                        <li key={idx}>
                            <textarea value={note.content} onChange={(e)=> updateNote(idx, e.target.value)}></textarea>
                            <button onClick={()=> deleteNote(idx)}>Delete</button>
                        </li>
                    ))
                }
            </ol>
        </>
    );
}

export default NotesList;