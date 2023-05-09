import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import ReactMarkdown from 'react-markdown';

import { Button, ButtonGroup, Form, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Workspace = () => {
const { selectedNote, handleNoteDelete, handleNoteEdit } = useContext(AppContext);
const [editing, setEditing] = useState(false);
const [contentEdit, setContentEdit] = useState('');
const [date, setDate] = useState('');
const [content, setContent] = useState('');

useEffect(() => {
    if (selectedNote) {
      setDate(selectedNote.date);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

const handleEditClick = () => {
  setEditing(true);
};

const handleCancelClick = () => {
  setEditing(false);
  setContentEdit('');
};

const handleSaveClick = () => {
  const newDate = new Date().toLocaleString();
  setDate(newDate);
  setContent(contentEdit);
  setEditing(false);
  handleNoteEdit(contentEdit, newDate);
};

const handleContentChange = (event) => {
  setContentEdit(event.target.value);
};

if (!selectedNote) {
  return <div className="workspace empty">
    <h2>No notes selected</h2>
    <p>Please select a note from the sidebar</p>
  </div>;
}

return (
  <div className="workspace">
    <div className="workspace-header">

      <Row className="justify-content-between mb-3">
        <Col className="col-auto">
          <h5 className="opacity-75 mb-3">{date}</h5>
        </Col>
        <Col className="col-auto">
          
            {editing ? (
              <ButtonGroup>
                <Button variant="primary" onClick={handleSaveClick}>Save</Button>
                <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button onClick={handleEditClick}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="danger" onClick={handleNoteDelete}><FontAwesomeIcon icon={faTrash} /></Button>
              </ButtonGroup>
            )}
          
        </Col>
      </Row>
      </div>
      <div className="workspace-content">
        {editing ? (
        <Form.Control 
          as="textarea" 
          rows={18} 
          defaultValue={content} 
          placeholder="Your text" 
          onChange={handleContentChange}
        />
        ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default Workspace;