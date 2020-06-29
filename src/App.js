import React, { Component } from 'react';

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
      foreignFilm: {},
    }
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

  render() {
    return (
      <div className='wrapper'>
        <Header />

        <main>
          <Search updateEnglishFilmState={this.updateEnglishFilmState} updateForeignFilmState={this.updateForeignFilmState} />
          {
            (Object.keys(this.state.englishFilm).length !== 0 && Object.keys(this.state.foreignFilm).length !== 0)
              ? <CurrentPair englishFilm={this.state.englishFilm} foreignFilm={this.state.foreignFilm} />
              : null
          }
          <Pairs />
        </main>
        
        <Footer />

      </div>
    );
  }
  
}

export default App;
