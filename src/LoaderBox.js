import React from 'react';
import { Dimmer, Loader, } from 'semantic-ui-react';

class LoaderBox extends React.Component {
  render () {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }
}

export default LoaderBox;
