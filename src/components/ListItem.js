import React, { useContext } from 'react';
import { AppContext } from '../App';

import { ListGroup} from 'react-bootstrap';

const ListItem = ({ note, handleNoteSelect }) => {
  const { content, date } = note;
  const { selectedNote } = useContext(AppContext);
  const activeClass = selectedNote ? selectedNote.id : null;

  return (
    <ListGroup.Item 
      key={note.id}
      className={note.id === activeClass ? 'active' : ''}
      onClick={() => handleNoteSelect(note)}>
        {content}
        <br/>
        <span className='small fw-bold opacity-50'>{date}</span>
    </ListGroup.Item>
  );
};

export default ListItem;