import React, { memo } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons/faDatabase";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

const Header = () => (
  <Navbar className="shadow">
    <Container className="justify-content-center" fluid>
      <Navbar.Brand style={{ marginLeft: "30px" }} tabIndex={0} href="#home">
        <FontAwesomeIcon icon={faDatabase} />
      </Navbar.Brand>
      <Navbar.Text style={{ fontSize: "25px", fontWeight: 600, color: "#000" }}>
        SQL Query Executor
      </Navbar.Text>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a
            href="https://github.com/ajaybharat/sql-executor"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> View in github
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default memo(Header);
