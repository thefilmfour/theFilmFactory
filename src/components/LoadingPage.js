import React from 'react';
import '../styles/errorMessage.scss';
import filmReel from '../assets/film-reel.svg'

/**
 * Returns the HTML for the loading page
 */
const LoadingPage = () => {
  return (
    <div className='loadingPage'>
      <div className='mainContent'>
        <img src={filmReel} />
        <p>Searching database...</p>
      </div>
    </div>
  )
}

export default LoadingPage;
