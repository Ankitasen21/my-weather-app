import React, { Component } from 'react';

class OtherComponent extends Component {
  componentDidMount() {
    // Simulate an error
    throw new Error('This is an intentional error.');
  }

  render() {
    return (
      <div>
        <h2>Other Component</h2>
      </div>
    );
  }
}

export default OtherComponent;
