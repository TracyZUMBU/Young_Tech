import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"} className="logo">
        Tech Work
      </Link>
    </header>
  );
};

export default Header;

