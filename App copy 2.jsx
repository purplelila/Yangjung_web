import './App.css'
import NotesProvider from './components/NotesProvider'
import AddNote from './components/AddNote'
import NotesList from './components/NotesList'

function App() {
  return (
    <NotesProvider>
      <AddNote/>
      <NotesList/>
    </NotesProvider>
  )
}

export default App
