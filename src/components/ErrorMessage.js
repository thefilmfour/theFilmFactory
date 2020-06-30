import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/errorMessage.scss';

const ErrorMessage = ({updateHasErrorState}) => {
  console.log('error message');
  return (
    <div className='errorMessage'>
      <p>Something went wrong,</p>
      <p>please try again.</p>
      <button type='button' onClick={updateHasErrorState}><FontAwesomeIcon icon={faTimesCircle}/></button>
    </div>
  )
}

// const handleClick = ({updateHasErrorState}) => {
//   ();
// }

export default ErrorMessage;