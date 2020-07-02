import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/FilmPair.scss';

class FilmPair extends Component {
  
  render() {
    const { englishFilm, foreignFilm } = this.props.pair;

    return (
      <li className="pair-block">
        <ul className="pair wrapper">
          <li className="film-flex">
            <div className="pair-info english">
              <h3>{englishFilm.title}</h3>
              {englishFilm.title.toLowerCase() !==
                englishFilm.original_title.toLowerCase() && (
                <h4>{englishFilm.original_title}</h4>
              )}
              <p className="date">{englishFilm.release_date.slice(0, 4)}</p>
              <p className="rating">
                <FontAwesomeIcon icon={faStar} /> {englishFilm.vote_average}/10
              </p>
              <p className="overview">{englishFilm.overview}</p>
            </div>
            <div className="pair-poster">
              <img
                src={`http://image.tmdb.org/t/p/w500/${englishFilm.poster_path}`}
                alt={`Movie poster for ${englishFilm.title}`}
              />
            </div>
          </li>

          <li className="film-flex">
            <div className="pair-info">
              <h3>{foreignFilm.title}</h3>
              {foreignFilm.title.toLowerCase() !==
                foreignFilm.original_title.toLowerCase() && (
                <h4>{foreignFilm.original_title}</h4>
              )}
              <p className="date">{foreignFilm.release_date.slice(0, 4)}</p>
              <p className="rating">
                <FontAwesomeIcon icon={faStar} /> {foreignFilm.vote_average}/10
              </p>
              <p className="overview">{foreignFilm.overview}</p>
            </div>
            <div className="pair-poster">
              <img
                src={`http://image.tmdb.org/t/p/w500/${foreignFilm.poster_path}`}
                alt={`Movie poster for ${foreignFilm.title}`}
              />
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

export default FilmPair;
