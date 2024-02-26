import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
function NavBar(props) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Navbar
      bg="transparent box-shadow w-100"
      className={styles.navbar}
      expand="lg"
    >
      <Container>
        <Link className={`${styles.navbarbrand} `} to="/">
          RecipeGPT
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="p-2">
            <Link
              className={`m-2 ${styles.navlink}`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
            <Link className={`m-2 ${styles.navlink}`} to="/about">
              About
            </Link>

            {isAuthenticated() ? (
              <>
                <Link className={`m-2 ${styles.navlink}`} to="/dashboard">
                  Dashboard
                </Link>
                <Link className={`m-2 ${styles.navlink}`} to="/profile">
                  Profile
                </Link>
                <Link
                  className={`m-2 ${styles.navlink}`}
                  to="/"
                  onClick={logout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className={`m-2 ${styles.navlink}`} to="/signup">
                  Sign Up
                </Link>
                <Link className={`m-2 ${styles.navlink}`} to="/login">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
