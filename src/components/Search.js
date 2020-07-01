import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../styles/Search.scss';
import Modal from './Modal';

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
      modal: {
        film: {},
        isForeign: false,
        display: false
      }
    };
  }

  // function to display the film details modal
  displayFilmModal = (film, isForeign = false) => {
    this.setState({
      modal: {
        film: film,
        isForeign: isForeign,
        display: true
      }
    });
  }

  // function to close the film details modal
  closeFilmModal = () => {
    this.setState({
      modal: {
        display: false
      }
    });
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
    });
  }
  
  // function to execute on click of english film poster
  selectEnglishFilm = async () => {
    this.closeFilmModal();
    const movieId = this.state.modal.film.id;
    const englishFilmsCopy = [...this.state.englishFilms];

    // goes through the array to find the object holding the selected movie's id and store it in the englishFilm variable
    const englishFilm = englishFilmsCopy.find( object => object.id === parseInt(movieId));

    // function from App.js to update the englishFilm state
    this.props.updateEnglishFilmState(englishFilm);

    let foreignFilms = [];
    let totalPages = 1;

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

        // push the data objects for each film to the similarFilms array
        response.data.results.forEach( object => {
          if (object.original_language !== 'en' && object.poster_path && !foreignFilms.some( film => film.id === object.id) && foreignFilms.length < 20) {
            foreignFilms.push(object);
          }
        });
      });
    }

    // update the foreignFilms state with the filtered array
    this.setState({
      foreignFilms
    });
  }

  // function to execute on foreign film selection
  selectForeignFilm = () => {
    this.closeFilmModal();
    const movieId = this.state.modal.film.id;
    const foreignFilmsCopy = [...this.state.foreignFilms];

    // goes through the array to find the object holding the selected movie's id and store it in the foreignFilm variable
    const foreignFilm = foreignFilmsCopy.find( object => object.id === parseInt(movieId));
    
    // function from App.js to update the foreignFilm state
    this.props.updateForeignFilmState(foreignFilm);
  }

  render() {
    return (
      <Fragment>
        {
          this.state.modal.display &&
          <Modal
            film={this.state.modal.film}
            closeFilmModal={this.closeFilmModal}
            selectFilm={this.state.modal.isForeign ? this.selectForeignFilm : this.selectEnglishFilm}
          />
        }

        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.userTextInput} onChange={this.handleChange} placeholder='Enter Movie' />
          <input type='submit' value='Search' />
        </form>

        {/* section to display the English films */}
        <section className='english-films'>
            {/* <img src={`http://image.tmdb.org/t/p/w500/${this.props.img}`} alt=""/> */}
          <h2>Results for "{this.state.userTextInput}"</h2>
          <ul className='grid-container'>
            {
              this.state.englishFilms.map( object => {
                return (
                  <li key={object.id}>
                    <button type='button' onClick={() => this.displayFilmModal(object)}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                  </li>
                )
              })
            }
          </ul>
        </section>

        {/* section to display the foreign films */}
        <section className='foreign-films'>
          <h2>Foreign film recommendations based on your English film selection:</h2>
          <ul className='grid-container'>
            {
              this.state.foreignFilms.map( object => {
                return (
                  <li key={object.id}>
                    <button type='button' onClick={() => this.displayFilmModal(object, true)}><img src={`http://image.tmdb.org/t/p/w500/${object.poster_path}`} alt={object.original_title}/></button>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </Fragment>
    )
  }
}

export default Search;
