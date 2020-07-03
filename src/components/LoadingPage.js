import React from 'react';
import filmReel from '../assets/film-reel.svg'

/**
 * Returns the HTML for the loading page
 */
const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <div className='main-content'>
        <img src={filmReel} alt="spinning film reel"/>
        <p>Searching database...</p>
      </div>
    </div>
  )
}

export default LoadingPage;
