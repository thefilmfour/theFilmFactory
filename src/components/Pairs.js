import React, { Component } from 'react';
import axios from 'axios';

class Pairs extends Component {

  // displaying the pairs in a list
  //   will listen everytime the database is altered
  constructor() {
    super();
    this.state = {
      filmPairs: [],
    }
  }


  handleClick = (event) => {
    // event.preventDefault()
    axios({
      url: `https://api.themoviedb.org/3/movie/300/similar`,
      params: {
        api_key: 'ac8a1621bd544ad33438bf381952729f',
      },
    }).then(response => {
      this.state.filmPairs.push({
        englishFilm: response.data.results[0],
        foreignFilm: response.data.results[1]
      })
      console.log(this.state.filmPairs)
    })
  }

  render() {

    return (
      <section>
        
        <button onClick={this.handleClick}>Click Me</button>
      </section>
    )

  }

}

export default Pairs;