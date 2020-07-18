import React, { Component } from 'react';
import { Navbar,  Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import NavLink from 'react-router-dom';
// import {Navbar, Nav , NavbarBrand } from 'react-bootstrap';


class Naviation extends Component {
    render() {
        return (

            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav defaultActiveKey="/home" as="ul">

                        <Nav.Item as="li">
                            <Nav.Link className="d-inline p-2 bg-dark text-white" href="/">Home</Nav.Link>
                        </Nav.Item> 

                        <Nav.Item as="li">
                            <Nav.Link className="d-inline p-2 bg-dark text-white" href="/Department">Department</Nav.Link>
                        </Nav.Item>

                        <Nav.Item as="li">
                            <Nav.Link className="d-inline p-2 bg-dark text-white" href="/employee">Employee</Nav.Link>
                        </Nav.Item>
 

                    </Nav>
                </Navbar.Collapse>

            </Navbar>


        )
    }
}

export default Naviation;