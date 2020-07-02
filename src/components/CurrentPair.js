import React, { Component, Fragment } from 'react';
import '../styles/CurrentPair.scss';
import firebase from '../firebase';
import FilmPair from './FilmPair';

class CurrentPair extends Component {

  constructor() {
    super();
    this.state = {
      savePairActive: true 
    }
  }

  /**
   * Adds a film pair object to the database
   * Connected to an event listener on the Save Pair button
  */
  savePair = () => {

    // These lines will remove CurrentPair
    // Bug: If these two lines are used, the scrollToPair method will not work properly because of CurrentPair disappearing 
    // this.props.updateEnglishFilmState({});
    // this.props.updateForeignFilmState({});

    const dbRef = firebase.database().ref();

    // Adds film pair object to database
    dbRef.push({
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    });

    this.setState({ savePairActive: false });

  }

  componentDidMount() {

    // Makes the Save Pair button clickable
    this.setState({ savePairActive: true });

    // Scrolls the Window to the CurrentPair component
    this.props.scrollToCurrentPair();

  }

  render() {
    // Creates a pair object, which is the necessary format for the FilmPair component to receive
    const pair = {
      englishFilm: this.props.englishFilm,
      foreignFilm: this.props.foreignFilm
    }

    return (
      <Fragment>
        <div className='wrapper'>
          <h3 className='film-pair-header' ref={this.props.CurrentPairRef}>Film Pairing</h3>
          <p>If you liked that film, you might like this one...</p>
        </div>
        <FilmPair pair={pair}/>
        <div className='wrapper'>
          <div className='film-pair-buttons'>
            <button
              onClick={() => { this.savePair(); this.props.scrollToPairs() }}
              className={ this.state.savePairActive ? 'save-pair active' : 'save-pair disabled' }
            >Save Pair</button>
            <button onClick={() => { this.props.scrollToSearch() }}>Search Again</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CurrentPair;
