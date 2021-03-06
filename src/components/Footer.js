import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

class Footer extends Component {

  render() {
    return (
      <footer>

        <section className='team-info'>

          <p className='team-made'>Made with <span className='heart' aria-label='love'>♥</span> by <span className='team-group'>The Film Four</span></p>
          <ul className='team-members'>
            <ul className='team-member'>
              <li className='team-name'>Eyel</li>
              <ul className='team-social'>  
                <li>
                  <a href='https://github.com/csmordido' title="Click to access Eyel's Github page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon 
                      icon={faGithub}
                      />
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/eyel_mordido' title="Click to access Eyel's Twitter page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faTwitter}
                    />
                  </a>
                </li>
              </ul>
            </ul>
            <ul className='team-member'>
              <li className='team-name'>Melissa</li>
              <ul className='team-social'>
                <li>
                  <a href='https://github.com/mel-ahls' title="Click to access Melissa's Github page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faGithub}
                      />
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/mel_ahls' title="Click to access Melissa's Twitter page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faTwitter}
                    />
                  </a>
                </li>
              </ul>
            </ul>
            <ul className='team-member'>
              <li className='team-name'>Robert</li>
              <ul className='team-social'>
                <li>
                  <a href='https://github.com/rduhig' title="Click to access Robert's Github page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faGithub}
                      />
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/robert_duhig' title="Click to access Robert's Twitter page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faTwitter}
                    />
                  </a>
                </li>
              </ul>
            </ul>
            <ul className='team-member'>
              <li className='team-name'>Taylor</li>
              <ul className='team-social'>
                <li>
                  <a href='https://github.com/QuercusTaliare' title="Click to access Taylor's Github page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faGithub}
                      />
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com/taylorRdev' title="Click to access Taylor's Twitter page" target='_blank' rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faTwitter}
                    />
                  </a>
                </li>
              </ul>
            </ul>
          </ul>
        </section>

        <section className='attributions'>
          <p>All films provided by <a href='https://www.themoviedb.org/documentation/api' target='_blank' rel="noopener noreferrer">The Movie DB API</a></p>
          <p>All icons provided by <a href='https://fontawesome.com/license' target="_blank" rel="noopener noreferrer">Font Awesome</a> and <a href='http://www.freepik.com/' title='Freepik' target="_blank" rel="noopener noreferrer">Freepik</a></p>
        </section>
        
      </footer>
    )
  }
}

export default Footer;
