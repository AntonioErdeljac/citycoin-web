import React from 'react';
import posed from 'react-pose';
import Loader from 'react-loader-spinner';

const Box = posed.div({
  visible: { opacity: 1, delay: 325 },
  hidden: { opacity: 0 },
});

class Loading extends React.Component {
  constructor() {
    super();

    this.state = {
      hasLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({
      hasLoaded: true,
    });
  }

  render() {
    const { hasLoaded } = this.state;

    return (
      <Box initialPose="hidden" pose={hasLoaded ? 'visible' : 'hidden'} className="cc-loading">
        <Loader
          type="Oval"
          color="#4E65F6"
          height="50"
          width="50"
        />
      </Box>
    );
  }
}

export default Loading;
