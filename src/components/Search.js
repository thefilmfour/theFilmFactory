import React, { Component, Fragment } from 'react';
import axios from 'axios';

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
      userTextInput: '',
      englishFilms: [],
      englishFilm: {},
      foreignFilms: [],
      foreignFilm: {}
    }
  }

  // function tracking the user's input
  handleChange = (event) => {
    const searchedMovie = event.target.value;
    this.setState({
      userTextInput: searchedMovie,
    });
  }

  // function on form submit
  handleSubmit = (event) => {
    event.preventDefault();
    // axios({
    //   url: 'https://api.themoviedb.org/3/search/movie',
    //   params: {
    //     api_key: '7e436244a51ab62563e1dbbb6bb31f24',
    //     query: this.state.userTextInput,
    //     language: 'en-US',
    //     include_adult: false,
    //   }
    // }).then( response => {
    //   const newEnglishFilms = [];

    //   // push each film data object to the newEnglishFilms array
    //   response.data.results.forEach(obj => {
    //     newEnglishFilms.push(obj);
    //   });

    //   // filter newEnglishFilms array for english language films and films that have a poster and store it in the englishFilms variable
    //   const englishFilms = newEnglishFilms.filter(object => object.original_language = 'en').filter(object => object.poster_path);

    //   // update the english films state to the filtered englishFilms variable
    //   this.setState({
    //     englishFilms,
    //   });
    // })
  }

  render() {

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.userTextInput} onChange={this.handleChange} placeholder='Enter Movie' />
          <input type='submit' value='Search' />
        </form>

        {/* section to display the English Films */}
        <section className='englishFilms'>
            {/* <img src={`http://image.tmdb.org/t/p/w500/${this.props.img}`} alt=""/> */}
          <ul class="gridContainer">
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
            <li>
              <img src="https://source.unsplash.com/random/500x750" alt="" />
            </li>
          </ul>
        </section>
      </Fragment>
    )

  }

}

export default Search;