import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import Search from "./components/Search";

import { Container, Card, Row, Col } from "react-bootstrap";

const AppContext = React.createContext();

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");

  const contextValue = {
   
  };

  return (
    <div className="App">
      <AppContext.Provider value={contextValue}>
        <Container className="py-5 container-min">
          <Card>
              <Card.Header className="d-flex justify-content-between">
                <Search/>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <Sidebar/>
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
}

export default App;
