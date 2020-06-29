import React, { Component, Fragment } from 'react';
import FilmPair from './FilmPair';

class CurrentPair extends Component {

  render() {

    const pair = {
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    }

    return (
      <Fragment>
        <h3>Film Pairing</h3>
        <p>If you liked that film, you might like this one...</p>
        <FilmPair pair={pair}/>
        <button>Save Pair</button>
      </Fragment>
    )

  }

}

export default CurrentPair;