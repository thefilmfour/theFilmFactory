import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Pairs from "./components/Pairs";
import Footer from "./components/Footer";

class App extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <Search />
          {/* <Pairs /> */}
        </main>
        
        <Footer />

      </Fragment>
    );
  }
  
}

export default App;
