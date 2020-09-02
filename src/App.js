import React from 'react';
import './App.css';

import { Nav, Navbar, Container, Form, Table, Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Project from './project.js';

function App() {
  return (
    <Router>
    <Container fluid={true}>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">FPM-IOT-ADMIN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#"><Link to="/">Dashboard</Link></Nav.Link>
          <Nav.Link href="#"><Link to="/mqtt">MQTT</Link></Nav.Link>
          <Nav.Link href="#"><Link to="/project">Project</Link></Nav.Link>
          <Nav.Link href="#"><Link to="/setting">Setting</Link></Nav.Link>
          
        </Nav>
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        <Form inline>
          <Button size="sm" variant="secondary">Exit</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </Container>
    <Switch>
      <Route exact path="/">
        <Project />
      </Route>
      <Route path="/mqtt">
        <Project />
      </Route>
      <Route path="/project">
        <Project />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
