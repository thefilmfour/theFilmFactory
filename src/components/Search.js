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

  constructor(props) {
    super(props);
    this.state = {
      userTextInput: '',
      englishFilms: [],
      foreignFilms: [],
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
    axios({
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        api_key: '7e436244a51ab62563e1dbbb6bb31f24',
        query: this.state.userTextInput,
        language: 'en-US',
        include_adult: false,
      }
    }).then( response => {
      let newEnglishFilms = [];

      // push each film data object to the newEnglishFilms array
      response.data.results.forEach(obj => {
        newEnglishFilms.push(obj);
      });

      // filter newEnglishFilms array for english language films and films that have a poster and store it in the englishFilms variable
      let filteredEnglishFilms = newEnglishFilms.filter(object => object.original_language = 'en').filter(object => object.poster_path);

      // grab only the first ten films and store it in the englishFilms variable
      let englishFilms = filteredEnglishFilms.slice(0, 10);
      
      // update the englishFilms state to have the 10 filtered film data objects
      this.setState({
        englishFilms,
      });
    })
  }

  onButtonClick = (event) => {
    const movieId = event.currentTarget.value;
    // axios({
    //   url: `https://api.themoviedb.org/3/movie/${movieId}/similar`,
    //   params: {
    //     api_key: '7e436244a51ab62563e1dbbb6bb31f24',
    //   }
    // }).then( response => {
    //   const newSimilarFilms = [];
    //   newSimilarFilms.push(response.data.results);
    //   this.setState({
    //     similarFilms: newSimilarFilms,
    //   });
    //   const similarFilmsCopy = this.state.similarFilms[0];
    //   const foreignFilms = similarFilmsCopy.filter((obj) => obj.original_language !== 'en' );
    //   this.props.updateForeignFilms(foreignFilms);
    // });

    const englishFilmsCopy = this.state.englishFilms;

    // use the id of the chosen film to find its object data and store it in the englishFilm variable
    const englishFilm = englishFilmsCopy.find( object => object.id === parseInt(movieId));

    // function from App.js to update the englishFilm state
    this.props.updateEnglishFilmState(englishFilm);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.userTextInput} onChange={this.handleChange}placeholder='Enter Movie' />
          <input type='submit' value='Search' />
        </form>

        {/* section to display the English films */}
        <section className='englishFilms'>
          <h2>Results for "{this.state.userTextInput}"</h2>
          <ul>
            {
              this.state.englishFilms.map( object => {
                return (
                  <li key={object.id}>
                    <button type='button' value={object.id} onClick={this.onButtonClick}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                  </li>
                )
              })
            }
          </ul>
        </section>

        {/* section to display the foreign films */}
        {/* <section className='foreignFilms'>
          <h2>Results for "{this.state.userTextInput}"</h2>
          <ul>
            {
              this.state.englishFilms.map( object => {
                return (
                  <li key={object.id}>
                    <button type='button' value={object.id}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                  </li>
                )
              })
            }
          </ul>
        </section> */}
      </Fragment>
    )

  }

}

export default Search;