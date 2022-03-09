import React from "react";
import "../scss/Header.scss";

const Header = ({ user }) => {
  return (
    <header className="header">
      <h1 className="header__title">Edvora</h1>
      <div className="header__user">
        <p>{user.name}</p>
        <img src={user.url} alt="userImage" />
      </div>
    </header>
  );
};

export default Header;
