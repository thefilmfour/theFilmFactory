import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '../styles/errorMessage.scss';

/**
 * TODO Complete this description
 * Why is the parameter in an object?
 * 
 * @param {*} param0 
 */
const ErrorMessage = ({updateHasErrorState}) => {
  return (
    <div className='errorMessage'>
      <p>Something went wrong,</p>
      <p>please try again.</p>
      <button type='button' onClick={updateHasErrorState}><FontAwesomeIcon icon={faTimesCircle}/></button>
    </div>
  )
}

export default ErrorMessage;