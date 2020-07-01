import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import LoadingPage from './LoadingPage';
import Modal from './Modal';
import '../styles/Search.scss';

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

    this.englishFilmsRef = React.createRef();
  }

  scrollToEnglishFilms = () => {
    window.scrollTo(0, this.englishFilmsRef.current.offsetTop)
  }

  /**
   * Displays a modal containing information about the selected film
   * 
   * @param {Object} film The selected film Object
   * @param {boolean} isForeign True if the selected film is foreign, false otherwise
   */
  displayFilmModal = (film, isForeign = false) => {
    this.setState({
      modal: {
        film: film,
        isForeign: isForeign,
        display: true
      }
    });
  };

  /**
   * Closes the film information modal
   */
  closeFilmModal = () => {
    this.setState({ modal: { display: false } });
  };

  /**
   * Sets the state to contain the user text input
   * 
   * @param {Event} event The Event occurring when the text input changes
   */
  handleChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ userTextInput: searchQuery });
  };

  /**
   * Queries the API for movies similar to the English language movie the user entered
   * 
   * @param {Event} event The Event occurring when the user submits their search query
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ foreignFilms: [], isLoading: true });
    let englishFilms = [];

    await axios({
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        api_key: '7e436244a51ab62563e1dbbb6bb31f24',
        query: this.state.userTextInput,
        language: 'en-US',
        include_adult: false,
      }
    }).then( response => {
      response.data.results.forEach( film => {
        if (film.original_language === 'en' && film.poster_path && englishFilms.length < 10) {
          englishFilms.push(film);
        }
      });

      // Scrolls to the list of English films
      this.scrollToEnglishFilms();

    }).catch( error => {
      if (error && !this.state.englishFilms.length) {
        this.setState({ hasError: true });
      }
    });

    this.setState({ englishFilms, isLoading: false });
  };
  
  /**
   * Updates the state to contain the selected English language film and queries the API
   * for similar foreign language films
   */
  selectEnglishFilm = async () => {
    this.closeFilmModal();
    this.setState({ isLoading: true });
    const englishFilm = this.state.modal.film;
    const filmId = this.state.modal.film.id;
    this.props.updateEnglishFilmState(englishFilm);
    // Error handling: If user selects an English Film, then selects a Foreign Film, and then re-selects an English film, this will make sure the CurrentPair is not rendering until another ForeignFilm has been selected (CurrentPair won't render until both englishFilm and foreignFilm are populated in App's state)
    this.props.updateForeignFilmState({});
    let foreignFilms = [];

    for (let i = 0; i <= this.state.totalPages && foreignFilms.length < 20; i++) {
      await axios({
        url: `https://api.themoviedb.org/3/movie/${filmId}/similar`,
        params: {
          api_key: '7e436244a51ab62563e1dbbb6bb31f24',
          page: i + 1
        }
      }).then( response => {
        response.data.results.forEach( film => {
          if (film.original_language !== 'en' && film.poster_path && !foreignFilms.some( obj => obj.id === film.id) && foreignFilms.length < 20) {
            foreignFilms.push(film);
          }
        });
        const totalPages = response.data.total_pages;
        this.setState({ totalPages });
      }).catch( error => {
        if (error && !this.state.foreignFilms.length) {
          this.setState({ hasError: true, totalPages: 0 });
        }
      });
    }

    this.setState({ foreignFilms, isLoading: false });

  };

  /**
   * Updates the state to contain the selected foreign language film
   */
  selectForeignFilm = () => {
    this.closeFilmModal();
    const foreignFilm = this.state.modal.film;
    this.props.updateForeignFilmState(foreignFilm);
  };

  /**
   * Updates the state when there are no current errors
   */
  updateHasErrorState = () => {
    this.setState({ hasError: false, totalPages: 0 });
  };

  render() {
    return (
      <Fragment>
        {
          this.state.modal.display
          && <Modal
            film={this.state.modal.film}
            closeFilmModal={this.closeFilmModal}
            selectFilm={this.state.modal.isForeign ? this.selectForeignFilm : this.selectEnglishFilm}
          />
        }
        { this.state.isLoading && <LoadingPage /> }
        <form onSubmit={this.handleSubmit} ref={this.props.SearchRef}>
          <input type='text' value={this.state.userTextInput} onChange={this.handleChange} placeholder='Enter Movie' />
          <input type='submit' value='Search' />
        </form>
        <section className='films' ref={this.englishFilmsRef}>
          {
            this.state.foreignFilms.length
            ? <h2>If you liked {this.props.englishFilm.title}, then maybe you'll like...</h2>
            : this.state.englishFilms.length
            ? <h2>Did you mean...</h2>
            : null
          }
          <ul className='grid-container'>
            {
              this.state.foreignFilms.length
              ? this.state.foreignFilms.map( film => {
                return (
                  <li key={film.id}>
                    <button
                      className="shadow"
                       type="button"
                      onClick={() => this.displayFilmModal(film, true)}
                    >
                      <img
                        src={`http://image.tmdb.org/t/p/w500/${film.poster_path}`}
                        alt={`Poster for the movie ${film.title}`}
                      />
                    </button>
                  </li>
                );
              })
              : this.state.englishFilms.map( film => {
                return (
                  <li key={film.id}>
                    <button className="shadow" type='button' onClick={() => this.displayFilmModal(film)}><img src={`http://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={`Poster for the movie ${film.title}`} /></button>
                  </li>
                );
              })
            }
          </ul>
        </section>
        
        {this.state.hasError && <ErrorMessage updateHasErrorState={this.updateHasErrorState} /> }
      </Fragment>
    );
  }
}

export default Search;
