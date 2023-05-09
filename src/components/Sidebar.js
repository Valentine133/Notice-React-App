import React, { useContext } from 'react';
import { AppContext } from '../App';
import ListItem from './ListItem';

import { ListGroup } from 'react-bootstrap';

const Sidebar = ({notes}) => {
  const { handleNoteSelect } = useContext(AppContext);

  return (
    <>
      <ListGroup className="mb-3">
        {notes.map((note) => (
          <ListItem
            key={note.id}
            note={note}
            handleNoteSelect={handleNoteSelect}
          />
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;