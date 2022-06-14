import Logo from "../../assets/header/Logo.svg";
import { Link } from "react-scroll";
import { useState } from "react";

export const HeaderComponent = () => {
  const [activeButton, setActiveButton] = useState("");
  return (
    <div>
      <div className="headerContainer__wrapper">
        <div className="headerContainer__headerMenu">
          <div className="headerContainer__logo">
            <img
              src={Logo}
              alt="Logo"
              className="headerContainer__imgLogotype"
            />
          </div>
          <div className="headerContainer__controlButtons">
            <Link
              className=" headerContainer__buttonText controlButtons"
              activeClass="active"
              to="users"
              spy={true}
              smooth={true}
              onClick={() => {
                setActiveButton("users");
              }}
            >
              Users
            </Link>
            <Link
              className=" headerContainer__buttonText buttonText"
              activeClass="active"
              to="sign up"
              spy={true}
              smooth={true}
              onClick={() => {
                setActiveButton("sign up");
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="headerContainer">
        <div className="header">
          <h1 className="header__title">
            Test assignment for front-end developer
          </h1>
          <div className="header__subtitle">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </div>
          <div className="buttonSign">
            <Link
              className="headerContainer__buttonText "
              activeClass="active"
              to="sign up"
              spy={true}
              smooth={true}
              onClick={() => {
                setActiveButton("sign up");
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
