require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Todos from './todo';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight - 64
    }
  }

  handleResize(e) {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 64
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  render() {
    let container = document.getElementById('app');
    container.style.width = this.state.width + 'px';
    container.style.height = this.state.height + 'px';
    return (
      <div className="main">
        <Todos />
      </div>
    );
  }
}

export default AppComponent;
