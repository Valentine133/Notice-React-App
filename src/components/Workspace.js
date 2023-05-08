import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import ReactMarkdown from 'react-markdown';

import { Button, ButtonGroup, InputGroup, Form, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Workspace = () => {
const { selectedNote, handleNoteDelete } = useContext(AppContext);
const [editing, setEditing] = useState(false);

const handleEditClick = () => {
setEditing(true);
};

const handleCancelClick = () => {
setEditing(false);
};

const handleSaveClick = () => {
setEditing(false);
};

if (!selectedNote) {
  return <div className="workspace empty">
    <h2>No notes selected</h2>
    <p>Please select a note from the sidebar</p>
  </div>;
}

const { title, content } = selectedNote;

return (
<div className="workspace">
<div className="workspace-header">
{editing ? (
<div className="mb-3">
  <InputGroup>
    <Form.Control defaultValue={title} />
    <Button variant="primary" onClick={handleSaveClick}>Save</Button>
    <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
  </InputGroup>
</div>
) : (
<div>
  <Row className="justify-content-between mb-3">
    <Col className="col-auto">
      <h2>{title}</h2>
    </Col>
    <Col className="col-auto">
      <ButtonGroup>
        <Button onClick={handleEditClick}><FontAwesomeIcon icon={faEdit} /></Button>
        <Button onClick={handleNoteDelete}><FontAwesomeIcon icon={faTrash} /></Button>
      </ButtonGroup>
    </Col>
  </Row>
  <div>{content}</div>
</div>
)}
</div>
<div className="workspace-content">
  {editing ? (
  <Form.Control as="textarea" rows={20} defaultValue={content} placeholder="Your text" />
  ) : (
  <ReactMarkdown>{content}</ReactMarkdown>
  )}
</div>
</div>
);
};

export default Workspace;