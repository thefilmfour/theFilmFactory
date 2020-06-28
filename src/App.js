import React, { Component, Fragment } from 'react';
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

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <Search updateEnglishFilmState={this.updateEnglishFilmState}/>
          {/* <Pairs /> */}
        </main>
        
        <Footer />

      </Fragment>
    );
  }
  
}

export default App;
