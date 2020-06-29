import React, { Component, Fragment } from 'react';
import firebase from '../firebase';
import FilmPair from './FilmPair';

class CurrentPair extends Component {

  savePair = () => {

    const dbRef = firebase.database().ref();

    // Adds film pair object to database
    dbRef.push({
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    });

  }

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
        <button onClick={this.savePair}>Save Pair</button>
        
      </Fragment>
    )

  }

}

export default CurrentPair;