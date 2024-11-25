import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-center">
        <Navbar.Brand href="#home">Calculator</Navbar.Brand>
      </Navbar>
    </>
  );
}

export default NavBar;
