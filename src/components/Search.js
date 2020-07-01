import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import LoadingPage from './LoadingPage';
import '../styles/Search.scss';
import Modal from './Modal';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userTextInput: '',
      englishFilms: [],
      foreignFilms: [],
      totalPages: 0,
      isLoading: '',
      hasError: false,
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
  selectEnglishFilm = async () => {
    this.closeFilmModal();
    this.setState({
      isLoading: true,
    });
    const movieId = this.state.modal.film.id;
    const englishFilmsCopy = [...this.state.englishFilms];

    // goes through the array to find the object holding the selected movie's id and store it in the englishFilm variable
    const englishFilm = englishFilmsCopy.find( object => object.id === parseInt(movieId));

    // function from App.js to update the englishFilm state
    this.props.updateEnglishFilmState(englishFilm);
    // Error handling: If user selects an English Film, then selects a Foreign Film, and then re-selects an English film, this will make sure the CurrentPair is not rendering until another ForeignFilm has been selected (CurrentPair won't render until both englishFilm and foreignFilm are populated in App's state)
    this.props.updateForeignFilmState({});

    let foreignFilms = [];

    for (let i = 0; i <= this.state.totalPages && foreignFilms.length < 20; i++) {
      // second axios call
      await axios({
        url: `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        params: {
          api_key: '7e436244a51ab62563e1dbbb6bb31f24',
          page: i + 1,
        }
      }).then( response => {
        const totalPages = response.data.total_pages;

        this.setState({
          totalPages,
        });

        // push the data objects for each film to the similarFilms array
        response.data.results.forEach( object => {
          if (object.original_language !== 'en' && object.poster_path && !foreignFilms.some( film => film.id === object.id) && foreignFilms.length < 20) {
            foreignFilms.push(object);
          }
        });
      }).catch( error => {
        if (error && !this.state.foreignFilms.length) {
          this.setState({
            hasError: true,
            totalPages: '0',
          });
        }
      });
    }

    // update the foreignFilms state with the filtered array
    this.setState({
      foreignFilms,
      isLoading: false
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

  updateHasErrorState = () => {
    this.setState({
      hasError: false,
      totalPages: 0
    });
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
        <form onSubmit={this.handleSubmit} ref={this.props.SearchRef}>
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
        {
          this.state.isLoading
          ? <LoadingPage />
          : <section className='foreign-films'>
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
        }
        {this.state.hasError ? <ErrorMessage updateHasErrorState={this.updateHasErrorState}/> : null}
      </Fragment>
    )
  }
}

export default Search;
