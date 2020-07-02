import React, { Component, Fragment } from 'react';

import './styles/setup.scss';
import './styles/global.scss';
import './styles/fontsAndColours.scss';

import Header from './components/Header';
import Search from './components/Search';
import CurrentPair from './components/CurrentPair';
import Pairs from './components/Pairs';
import Footer from './components/Footer';

class App extends Component {
  constructor () {
    super();
    this.state = {
      englishFilm: {},
      foreignFilm: {}
    };
    this.SearchRef = React.createRef();
    this.CurrentPairRef = React.createRef();
    this.PairsRef = React.createRef();
  }

  /**
   * Updates the state to contain the selected English language film
   * 
   * @param {Object} filmObj An Object representing the selected film
   */
  updateEnglishFilmState = (filmObj) => {
    this.setState({ englishFilm: filmObj });
  };

  /**
   * Updates the state to contain the selected foreign language film
   * 
   * @param {Object} filmObj An Object representing the selected film
   */
  updateForeignFilmState = (filmObj) => {
    this.setState({ foreignFilm: filmObj });
  };

  /**
   * Scrolls the Window to the Search component
   */
  scrollToSearch = () => {
    window.scrollTo(0, this.SearchRef.current.offsetTop);
  };

  /**
   * Scrolls the Window to the CurrentPair component
   */
  scrollToCurrentPair = () => {
    window.scrollTo(0, this.CurrentPairRef.current.offsetTop)
  }

  /** 
   * Scrolls the Window to the Pairs component
   */
  scrollToPairs = () => {
    window.scrollTo(0, this.PairsRef.current.offsetTop);
  };

  render() {
    return (
      <Fragment>
        <Header scrollToSearch={this.scrollToSearch} />
        <main>
          <Search
            englishFilm={this.state.englishFilm}
            updateEnglishFilmState={this.updateEnglishFilmState}
            updateForeignFilmState={this.updateForeignFilmState}
            SearchRef={this.SearchRef}
          />
          { // The CurrentPair component will not be rendered unless the englishFilm and foreignFilm objects in state have something inside
            (Object.keys(this.state.englishFilm).length !== 0 && Object.keys(this.state.foreignFilm).length !== 0)
            && <CurrentPair
              englishFilm={this.state.englishFilm}
              foreignFilm={this.state.foreignFilm}
              updateEnglishFilmState={this.updateEnglishFilmState}
              updateForeignFilmState={this.updateForeignFilmState}
              scrollToPairs={this.scrollToPairs}
              scrollToSearch={this.scrollToSearch}
              CurrentPairRef={this.CurrentPairRef}
              scrollToCurrentPair={this.scrollToCurrentPair}
            />
          }
          <Pairs PairsRef={this.PairsRef} />
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
