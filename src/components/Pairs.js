import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../firebase';

class Pairs extends Component {
  // displaying the pairs in a list
  //   will listen everytime the database is altered
  constructor() {
    super();
    this.state = {
      filmPairs: [],
    };
  }

  handleClick = (event) => {
    // event.preventDefault()
    axios({
      url: `https://api.themoviedb.org/3/movie/308/similar`,
      params: {
        api_key: "ac8a1621bd544ad33438bf381952729f",
      },
    }).then((response) => {
      const filmPair = {
        englishFilm: response.data.results[0],
        foreignFilm: response.data.results[1],
      };

      const dbRef = firebase.database().ref();

      dbRef.push(filmPair);
    });
  };



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
      for (let entry in data) {
        newState.push(data[entry]);
      }
      // 3. Set State with changed copy
      this.setState({ filmPairs: newState });
    });
  }


  render() {
    return (
      <section>
        <button onClick={this.handleClick}>Click Me</button>
        <ul>
          {this.state.filmPairs.map((filmPair) => {
            return <li>{filmPair.englishFilm.title}</li>
          })}
        </ul>
      </section>
    );
  }
}

export default Pairs;

{/* <img
  src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
  alt={`Movie poster for ${movie.title}`}
/>; */}