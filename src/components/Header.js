import React, { Component } from 'react';
import '../styles/Header.scss';

class Header extends Component {

  render() {
    return (
      <header>
        <div className='welcome'>
          <h1>
            The Film
            <br /> Factory
          </h1>
          <button className='scroll' type='button' onClick={this.props.scrollToSearch}>Find Your Movie Match</button>
        </div>
      </header>
    );
  }
}

export default Header;
