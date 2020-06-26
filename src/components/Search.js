import React, { Component } from 'react';

class Search extends Component {


  // text input has onChange handler connecting it to userInput in state
  // componentDidMount
  // 1st Axios -> wait until this returns 
  //  -This will take the user Input and will query the endpoint
  //  -Return an array of objects (each representing a film)
  //  -Display a list of movies (~10 results)
  //    -Movie posters
  //  -User can choose the correct movie 
  //    -Click Event
  // 2nd Axios
  //  -use englishFilm's id to make 2nd call
  //  -while loop until foreignFilms array reaches 20 films 
  //    -page counter
  //    -return array of foreignFilm objects
  //  -display list of foreign films (posters)
  //    -each with a click event
  //  -user selects a foreign film
  //    -creates a pair of English film and Foreign film 
  //    -This is placed in Firebase 
  // 
  //  

  constructor() {
    super();
    this.state = {
      userTextInput = '',
      englishFilms = [],
      englishFilm = {},
      foreignFilms = [],
      foreignFilm = {}
    }
  }



  render() {

    return (
      <section>
        <input type="text" value={this.state.userInput}></input>
        
      </section>
    )

  }

}

export default Search;