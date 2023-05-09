import React, { useContext, useCallback } from 'react';
import { AppContext } from '../App';
import debounce from 'lodash.debounce';

import { Row, Col, Button, Form } from 'react-bootstrap';

const Search = () => {
  const { handleNoteAdd, handleNoteSearch, searchTerm, setSearchTerm } = useContext(AppContext);

  const updateSearchValue = useCallback(
    debounce((searchTerm) => {
      handleNoteSearch(searchTerm);
    }, 800),[]
  )

  const handleSearchTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    updateSearchValue(value);
  };

  return (
    <Row className="d-flex justify-content-between">
      <Col className='col-auto'>
        <Button onClick={handleNoteAdd}>Add</Button>
      </Col>
      <Col className='col-auto'>
        <Form.Control type="search" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search by notes" />
      </Col>
    </Row>
  )
}

export default Search;