import React, { Component, Fragment } from 'react';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <Search />
          <Pairs />
        </main>
        
        <Footer />

      </Fragment>
    );
  }
  
}

export default App;
