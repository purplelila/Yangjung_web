import { useContext, useState } from "react";
import {NotesContext} from "./NotesProvider";

function AddNote() {
    const[input, setInput] = useState("")
    let {addNote} = useContext(NotesContext)

    function handleSubmit(e){
        e.preventDefault()
        if(input){
            addNote({content : input})
            setInput("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea placeholder="write a New Note" onChange={(e)=> setInput(e.target.value)} value={input}></textarea>
            <button type="submit">Add Note</button>
        </form>
    );
}

export default AddNote;