import React from 'react';
import '../styles/errorMessage.scss';

/**
 * Returns the HTML for the loading page
 */
const LoadingPage = () => {
  return (
    <div className='loadingPage'>
      <p>Searching database...</p>
    </div>
  )
}

export default LoadingPage;
