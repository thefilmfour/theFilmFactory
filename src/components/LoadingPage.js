import React from 'react';
import '../styles/errorMessage.scss';

const LoadingPage = () => {
  console.log('loading');
  return (
    <div className='loadingPage'>
      <p>Searching database...</p>
    </div>
  )
}

export default LoadingPage;