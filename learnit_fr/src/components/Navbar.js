import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../index.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/cursos">Cursos</Link>
    </nav>
  );
};

export default Navbar;
