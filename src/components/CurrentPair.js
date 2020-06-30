import React, { Component, Fragment } from 'react';
import '../styles/CurrentPair.scss';
import firebase from '../firebase';
import FilmPair from './FilmPair';

class CurrentPair extends Component {

  // SAVE PAIR FUNCTION - Adds film pair to database
  // Event Listener connected to Save Pair button
  savePair = () => {

    const dbRef = firebase.database().ref();

    // Adds film pair object to database
    dbRef.push({
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    });

  }

  render() {

    // Creates a pair object, which is the necessary format for the FilmPair component to receive
    const pair = {
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    }

    return (
      <Fragment>

        <h3>Film Pairing</h3>
        <p>If you liked that film, you might like this one...</p>
        <FilmPair pair={pair}/>
        <button onClick={() => {
          // Saves pair in database
          this.savePair();
          // Scrolls to Pairs component
          this.props.scrollToPairs();
        }}>
          Save Pair
        </button>
        <button onClick={() => {

          // Scrolls to Search component
          this.props.scrollToSearch();

        }}>
          Search Again
        </button>

      </Fragment>
    )

  }

}

export default CurrentPair;