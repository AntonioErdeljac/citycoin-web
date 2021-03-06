import React from 'react';
import posed from 'react-pose';

const Box = posed.div({
  visible: { opacity: 1, delay: 325 },
  hidden: { opacity: 0 },
});

class Empty extends React.Component {
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
      <Box initialPose="hidden" pose={hasLoaded ? 'visible' : 'hidden'} className="cc-empty">
        <i className="fas fa-box-open" />
        <p>Nema rezultata</p>
      </Box>
    );
  }
}

export default Empty;
