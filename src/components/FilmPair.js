import React, { Component } from "react";

class FilmPair extends Component {

  
  render() {

    const {englishFilm, foreignFilm} = this.props.pair

    return (
      <ul>
        <li>
          <h3>{englishFilm.title}</h3>
          <p>{englishFilm.release_date.slice(0, 4)}</p>
          <p>{englishFilm.overview}</p>
          <p>{englishFilm.vote_average}</p>
          <img
            src={`http://image.tmdb.org/t/p/w500/${englishFilm.poster_path}`}
            alt={`Movie poster for ${englishFilm.title}`}
          />
        </li>
        
        <li>
          <h3>{foreignFilm.title}</h3>
          <p>{foreignFilm.release_date.slice(0, 4)}</p>
          <p>{foreignFilm.overview}</p>
          <p>{foreignFilm.vote_average}</p>
          <img
            src={`http://image.tmdb.org/t/p/w500/${foreignFilm.poster_path}`}
            alt={`Movie poster for ${foreignFilm.title}`}
          />
        </li>
      </ul>
    );
  }
}

export default FilmPair;