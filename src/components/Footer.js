import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// https://github.com/FortAwesome/react-fontawesome
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../Footer.scss';

// Everyone will need to install these dependencies
// npm i--save @fortawesome/fontawesome-svg-core
// npm i--save @fortawesome/free-solid-svg-icons
// npm i--save @fortawesome/react-fontawesome
// npm i--save @fortawesome/free-brands-svg-icons

class Footer extends Component {

  render() {

    return (
      <footer>
        <section className="attributions">
          <p>All films provided by <a href="https://www.themoviedb.org/documentation/api">The Movie DB API</a></p>
          <p>All icons provided by <a href="https://fontawesome.com/license">Font Awesome</a></p>
        </section>

        <section className="team-info">

          <p>Made with <span aria-label="love">♥</span> by The Film Four</p>
          <ul className="team-members">
            <ul className="team-member">
              <li>Cheriele</li>
              <li>
                <a href="https://github.com/csmordido" title="Click to access Cheriele's Github page" target="_blank">
                  <FontAwesomeIcon 
                    icon={faGithub}
                  />
                </a>
              </li>
            </ul>
            <ul>
              <li>Melissa</li>
              <li>
                <a href="https://github.com/mel-ahls" title="Click to access Melissa's Github page" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                  />
                </a>
              </li>
            </ul>
            <ul>
              <li>Robert</li>
              <li>
                <a href="https://github.com/rduhig" title="Click to access Robert's Github page" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                  />
                </a>
              </li>
            </ul>
            <ul>
              <li>Taylor</li>
              <li>
                <a href="https://github.com/QuercusTaliare" title="Click to access Taylor's Github page" target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                  />
                </a>
              </li>
            </ul>
            
          </ul>
        </section>
      </footer>
    )

  }

}

export default Footer;