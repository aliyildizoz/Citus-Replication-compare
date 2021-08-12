import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Citus from './components/Citus'
import PostgresRepl from './components/PostgresRepl';
function App() {

  const [counts, setCounts] = useState({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await fetch("http://localhost:5000/api/todos").then((res) => res.json()).then((data) => setCounts(data)).catch((err) => console.log(err));
  }, [])
  return (
    <div className="App">
      <Container>
        <Row>
          <Citus count={counts.citusCount} />
        </Row>
        <Row className="mt-5">
          <PostgresRepl count={counts.pgCount} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
