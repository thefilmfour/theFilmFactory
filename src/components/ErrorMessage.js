import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * TODO Complete this description
 * Why is the parameter in an object?
 * 
 * @param {*} param0 
 */
const ErrorMessage = ({updateHasErrorState}) => {
  return (
    <div className='error-message'>
      <div className='main-content'>
        <p>Something went wrong,</p>
        <p>please try again.</p>
        <button type='button' onClick={updateHasErrorState}><FontAwesomeIcon icon={faTimesCircle}/></button>
      </div>
    </div>
  )
}

export default ErrorMessage;
