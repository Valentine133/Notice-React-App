import React, { useState, useEffect } from 'react';
import { useIndexedDB } from './hooks/useIndexedDB';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import Search from './components/Search';

import { Container, Card, Row, Col } from "react-bootstrap";

export const AppContext = React.createContext();

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const { getAllNotes, addNote, updateNote, deleteNote } = useIndexedDB();

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    };
    fetchNotes();
  }, []);

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleNoteAdd = async () => {
    const newNote = {
      id: Date.now(),
      content: '',
      date: `${new Date().toLocaleString()}`,
    };
    await addNote(newNote);
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleNoteDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      await deleteNote(selectedNote);
      setNotes(notes.filter((note) => note.id !== selectedNote.id));
      setSelectedNote(null);
    }
  };

  const handleNoteEdit = async (content, date) => {
    const updatedNote = {
      ...selectedNote,
      content,
      date,
    };
    await updateNote(updatedNote);
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setSelectedNote(updatedNote);
  };

  const contextValue = {
   notes, 
   selectedNote,
   handleNoteSelect,
   handleNoteAdd,
   handleNoteDelete,
   handleNoteEdit,
   setSelectedNote
  };

  return (
    <div className="app">
      <AppContext.Provider value={contextValue}>
        <Container className="py-5 container-min">
          <Card>
              <Card.Header>
                <Search/>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <Sidebar notes={notes}/>
                  </Col>
                  <Col sm={8}>
                    <Workspace/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        </Container>
      </AppContext.Provider>
   </div>
  );
};
export default App;
