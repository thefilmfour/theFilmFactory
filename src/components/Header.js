import React, { Component } from 'react';
import '../styles/Header.scss';

class Header extends Component {

  render() {
    return (
      <header>
        <div className="welcome">
          <h1>
            The Film
            <br /> Factory
          </h1>
          <p>Find your movie match</p>
        </div>
      </header>
    );
  }
}

export default Header;
