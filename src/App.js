import React, { Component } from 'react';

import './styles/setup.scss';
import './styles/global.scss';
import './styles/fontsAndColours.scss';

import Header from './components/Header';
import Search from './components/Search';
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
          {/* <Pairs /> */}
        </main>
        
        <Footer />

      </div>
    );
  }
  
}

export default App;
