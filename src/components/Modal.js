import React, { Component } from 'react';
import '../styles/Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Modal extends Component {
  render() {
    const { film, closeFilmModal, selectFilm } = this.props;

    return (
      <div className='overlay'>
        <div className='modal'>
          <div>
            <img src={`http://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={`Movie poster for ${film.title}`} />
          </div>
          <div className='modal-info'>
            <button className='close' type='button' onClick={closeFilmModal}><FontAwesomeIcon icon={faTimesCircle} /></button>
            <h3>{film.title}</h3>
            { film.title !== film.original_title && <h4>{film.original_title}</h4> }
            <p className="date">{film.release_date.slice(0, 4)}</p>
            <p><i className='fas fa-star'></i> {film.vote_average}/10</p>
            <p>{film.overview}</p>
            <button className='select' type='button' onClick={selectFilm}>Select this movie</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
