import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Search from './components/Search';
import Pairs from "./components/Pairs";
import Footer from "./components/Footer";

class App extends Component {

  render() {
    return (
      <div class="wrapper">
        <Header />
        <main>
          <Search />
          <Pairs />
        </main>
        
        <Footer />

      </div>
    );
  }
  
}

export default App;
