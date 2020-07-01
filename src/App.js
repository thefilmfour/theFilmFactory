import React, { Component, Fragment } from 'react';

import './styles/setup.scss';
import './styles/global.scss';
import './styles/fontsAndColours.scss';

import Header from './components/Header';
import Search from './components/Search';
import CurrentPair from './components/CurrentPair';
import Pairs from "./components/Pairs";
import Footer from "./components/Footer";

class App extends Component {
  constructor () {
    super();
    this.state = {
      englishFilm: {},
      foreignFilm: {}
    }

    this.SearchRef = React.createRef();
    this.CurrentPairRef = React.createRef();
    this.PairsRef = React.createRef();

  }

  // function passed as props to the Search component to update the englishFilm state
  updateEnglishFilmState = (data) => {
    this.setState({
      englishFilm: data,
    });
  }

  // function passed as props to the Search component to update the foreignFilm state
  updateForeignFilmState = (data) => {
    this.setState({
      foreignFilm: data,
    });
  }

  // Scroll to Search component
  scrollToSearch = () => {
    window.scrollTo(0, this.SearchRef.current.offsetTop)
  }

  /**
   * Scrolls the Window to the CurrentPair component
   */
  scrollToCurrentPair = () => {
    window.scrollTo(0, this.CurrentPairRef.current.offsetTop)
  }

  // Scroll to Pairs component
  scrollToPairs = () => {
    window.scrollTo(0, this.PairsRef.current.offsetTop)
  }

  render() {
    return (
      <Fragment>
        <Header />

        <main>

          <div className="wrapper">
            
          {/* <Search 
            updateEnglishFilmState={this.updateEnglishFilmState} 
            updateForeignFilmState={this.updateForeignFilmState} 
            SearchRef={this.SearchRef}
          />
          { // The CurrentPair component will not be rendered unless the englishFilm and foreignFilm objects in state have something inside
            (Object.keys(this.state.englishFilm).length !== 0 && Object.keys(this.state.foreignFilm).length !== 0)
              ? <CurrentPair 
                  englishFilm={this.state.englishFilm} 
                  foreignFilm={this.state.foreignFilm} 
                  updateEnglishFilmState={this.updateEnglishFilmState}
                  updateForeignFilmState={this.updateForeignFilmState}
                  scrollToPairs={this.scrollToPairs} 
                  scrollToSearch={this.scrollToSearch}
                  CurrentPairRef={this.CurrentPairRef}
                  scrollToCurrentPair={this.scrollToCurrentPair}
                />
              : null
          }
          <Pairs 
            PairsRef={this.PairsRef} 
          /> */}
            
          </div>

        </main>

        <Footer />
      </Fragment>
    );
  }
  
}

export default App;
