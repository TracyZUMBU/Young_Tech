import React from "react";
import $ from "jquery";
// components
import Header from "./Header";
import { useEffect } from "react";
import NavBar from "./Navbar";

const Hero = ({ title, subtitle, logo, nameUser }) => {
  useEffect(() => {
    $("#logo-menu").on("click", () => {
      $(".navigation").toggle();
    });
  }, []);

  return (
    <section className="hero">
      <img
        id="logo-menu"
        src="https://img.icons8.com/metro/26/000000/menu.png"
        alt="menu logo"
      />
      <NavBar />
      <Header />
      {title ?    
      <div className="heading-primary">
        <h1 className="heading-primary--main">{title}</h1>
        <p className="heading-primary--sub">{subtitle}</p>
      </div>
      :null}
      {logo ?
      <div className="heading-primary heading-primary--down">
      <img className="profilePhoto" src={logo} alt="" />
      <h1 className="heading-primary--main">{nameUser}</h1>
    </div> 
      : null}
      
    </section>
  );
};


export default Hero;
