import { createContext, useState } from "react";

// 전역변수여서 다른 파일에서도 가져다 쓸수 있게 export 이용
export let NotesContext = createContext()

function NotesProvider({children}) {
    const [notes, setNotes] = useState([])
    function addNote(note){
        setNotes([...notes, note])
    }
    function deleteNote(idx){
        let filteredNotes = notes.filter((_, i)=> i !== idx)
        setNotes(filteredNotes)
    }
    function updateNote(newIdx, newcontent){
        let updateNotes = notes.map((n, i)=> i === newIdx ? {...n, content:newcontent} : n)
        setNotes(updateNotes)
    }

    return (
        <NotesContext.Provider value={{addNote, notes, deleteNote, updateNote}}>
            {children}
        </NotesContext.Provider>
    );
}

export default NotesProvider;