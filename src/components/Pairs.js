import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Pairs.scss';
import firebase from '../firebase';
import FilmPair from './FilmPair';

class Pairs extends Component {
  // displaying the pairs in a list
  //   will listen everytime the database is altered
  constructor() {
    super();
    this.state = {
      filmPairs: [],
    };
  }

  // Event Handler for adding practice data to database - CAN BE DELETED EVENTUALLY
  // handleClick = (event) => {
  //   // event.preventDefault()
  //   axios({
  //     url: `https://api.themoviedb.org/3/movie/308/similar`,
  //     params: {
  //       api_key: "ac8a1621bd544ad33438bf381952729f",
  //     },
  //   }).then((response) => {
  //     const filmPair = {
  //       englishFilm: response.data.results[0],
  //       foreignFilm: response.data.results[1],
  //     };

  //     const dbRef = firebase.database().ref();

  //     dbRef.push(filmPair);
  //   });
  // };



  componentDidMount() {
    // create a variable to store a reference to our database
    const dbRef = firebase.database().ref();
    // Constantly monitor what values are in the database, and when something changes, run callback function
    dbRef.on("value", (response) => {
      // 1. a) Make copy of State
      const newState = [];
      // 1. b) Get information from database
      const data = response.val();
      // 2. Make changes to copy of State
      // Include id property for key attribute when mapping out multiple FilmPair components
      for (let entry in data) {
        newState.push({
          pair: data[entry],
          id: entry
        });
      }
      // 2. b) Reverse copy of State, so newest entries are display first
      const reverseState = newState.reverse();

      // 3. Set State with changed copy
      this.setState({ filmPairs: newState });
    });
  }


  render() {
    return (
      <section ref={this.props.PairsRef}>
        {/* Button used to add practice data to database. CAN BE DELETED EVENTUALLY */}
        {/* <button onClick={this.handleClick}>Click Me</button> */}
        <h2>Movies To Watch</h2>
        <ul>
          {this.state.filmPairs.map((filmPair) => {
           return <FilmPair pair={filmPair.pair} key={filmPair.id}/>
          })}
        </ul>
      </section>
    );
  }
}

export default Pairs;


