import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import '../styles/FilmPair.scss';

class FilmPair extends Component {
  
  render() {
    const {englishFilm, foreignFilm} = this.props.pair

    return (
      <ul className='pair'>
        <li className="film-flex">
          <div className='pair-info english'>
            <h3>{englishFilm.title}</h3>
            <p className="date">{englishFilm.release_date.slice(0, 4)}</p>
            <p>
              {/* <FontAwesomeIcon
                icon={faStar}
              /> */}
              {englishFilm.vote_average}/10</p>
            <p>{englishFilm.overview}</p>
          </div>
          <div className='pair-poster'>
            <img
              src={`http://image.tmdb.org/t/p/w500/${englishFilm.poster_path}`}
              alt={`Movie poster for ${englishFilm.title}`}
            />
          </div>
        </li>
        
        <li className="film-flex">
          <div className="pair-info">
            <h3>{foreignFilm.title}</h3>
            <p className="date">{foreignFilm.release_date.slice(0, 4)}</p>
            <p><i className='fas fa-star'></i> {foreignFilm.vote_average}/10</p>
            <p>{foreignFilm.overview}</p>
          </div>
          <div className='pair-poster'>
            <img
              src={`http://image.tmdb.org/t/p/w500/${foreignFilm.poster_path}`}
              alt={`Movie poster for ${foreignFilm.title}`}
            />
          </div>
        </li>
      </ul>
    )
  }
}

export default FilmPair;
