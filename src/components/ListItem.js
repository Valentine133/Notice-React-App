import React, { useContext } from 'react';
import { AppContext } from '../App';

import { ListGroup} from 'react-bootstrap';

const ListItem = ({ note, handleNoteSelect }) => {
  const { title } = note;

  // const { setSelectedNote } = useContext(AppContext);

  return (
    <ListGroup.Item 
      key={note.id}
      className={note.id === handleNoteSelect ? 'active' : ''}
      onClick={() => handleNoteSelect(note)}>
        {title}
    </ListGroup.Item>
  );
};

export default ListItem;