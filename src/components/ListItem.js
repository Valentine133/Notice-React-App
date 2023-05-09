import React, { useContext } from 'react';
import { AppContext } from '../App';

import { ListGroup} from 'react-bootstrap';

const ListItem = ({ note, handleNoteSelect }) => {
  const { content, date } = note;

  // const { setSelectedNote } = useContext(AppContext);

  return (
    <ListGroup.Item 
      key={note.id}
      className={note.id === handleNoteSelect ? 'active' : ''}
      onClick={() => handleNoteSelect(note)}>
        {content}
        <br/>
        <span className='small text-secondary'>{date}</span>
    </ListGroup.Item>
  );
};

export default ListItem;