import React, { useContext } from 'react';
import { AppContext } from '../App';

import { Row, Col, Button } from 'react-bootstrap';

const Search = () => {
  const { handleNoteAdd } = useContext(AppContext);

  return (
    <Row className="d-flex justify-content-between">
      <Col>
        <Button onClick={handleNoteAdd}>Add</Button>
      </Col>
      <Col>
        <div>Search</div>
      </Col>
    </Row>
  )
}

export default Search
