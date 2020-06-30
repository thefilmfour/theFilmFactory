import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import LoadingPage from './LoadingPage';
import '../styles/Search.scss';

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
      isLoading: '',
      hasError: false,
    }
  }

  // function tracking the user's input
  handleChange = (event) => {
    const searchedMovie = event.target.value;
    this.setState({
      userTextInput: searchedMovie,
    });
  }

  // function to execute on form submit
  handleSubmit = (event) => {
    this.setState({
      foreignFilms: [],
    });
    
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

      // filter newEnglishFilms array for english language films that have a poster and store it in the englishFilms variable
      let filteredEnglishFilms = newEnglishFilms.filter(object => object.original_language = 'en').filter(object => object.poster_path);

      // grab only the first ten films and store it in the englishFilms variable
      let englishFilms = filteredEnglishFilms.slice(0, 10);
      
      // update the englishFilms state to have the 10 filtered film data objects
      this.setState({
        englishFilms,
      });
    }).catch( error => {
      if (error && !this.state.englishFilms.length) {
        this.setState({
          hasError: true,
        });
      }
    });
  }

  // function to execute on click of english film poster
  onEnglishFilmClick = async (event) => {
    this.setState({
      isLoading: true,
    });

    const movieId = event.currentTarget.value;

    const englishFilmsCopy = [...this.state.englishFilms];
    // goes through the array to find the object holding the selected movie's id and store it in the englishFilm variable
    const englishFilm = englishFilmsCopy.find( object => object.id === parseInt(movieId));

    // function from App.js to update the englishFilm state
    this.props.updateEnglishFilmState(englishFilm);

    let foreignFilms = [];
    let totalPages = 1000;

    for (let i = 1; i <= totalPages && foreignFilms.length < 20; i++) {
      // second axios call
      await axios({
        url: `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        params: {
          api_key: '7e436244a51ab62563e1dbbb6bb31f24',
          page: i,
        }
      }).then( response => {
        totalPages = response.data.total_pages;
        
        // const similarFilms = [];

        // push the data objects for each film to the similarFilms array
        response.data.results.forEach( object => {
          if (object.original_language !== 'en' && object.poster_path && !foreignFilms.some( film => film.id === object.id) && foreignFilms.length < 20) {
            foreignFilms.push(object);
          }
        });
      })
    }

    // update the foreignFilms state with the filtered array
    this.setState({
      foreignFilms,
      isLoading: false,
    });
  }

  // function to execute on foreign film selection
  onForeignFilmClick = (event) => {

    // store the movie id in a variable
    const movieId = event.currentTarget.value;

    const foreignFilmsCopy = [...this.state.foreignFilms];

    // goes through the array to find the object holding the selected movie's id and store it in the foreignFilm variable
    const foreignFilm = foreignFilmsCopy.find( object => object.id === parseInt(movieId));
    
    // function from App.js to update the foreignFilm state
    this.props.updateForeignFilmState(foreignFilm);
  }

  updateHasErrorState = () => {
    this.setState({
      hasError: false,
    });
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.userTextInput} onChange={this.handleChange} placeholder='Enter Movie' />
          <input type='submit' value='Search' />
        </form>

        {/* section to display the English films */}
        <section className='englishFilms'>
          <h2>Results for "{this.state.userTextInput}"</h2>
          <ul className='gridContainer'>
            {
              this.state.englishFilms.map( object => {
                return (
                  <li key={object.id}>
                    <button type='button' value={object.id} onClick={this.onEnglishFilmClick}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {
          this.state.isLoading
          ? <LoadingPage />
          : <section className='foreignFilms'>
              <h2>Foreign film recommendations based on your English film selection:</h2>
              <ul className='gridContainer'>
                {
                  this.state.foreignFilms.map( object => {
                    return (
                      <li key={object.id}>
                        <button type='button' value={object.id} onClick={this.onForeignFilmClick}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                      </li>
                    )
                  })
                }
              </ul>
            </section>
        }

        {this.state.hasError ? <ErrorMessage updateHasErrorState={this.updateHasErrorState}/> : null}
      </Fragment>
    )
  }
}

export default Search;