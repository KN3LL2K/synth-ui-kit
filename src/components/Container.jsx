import React, { Component } from 'react';

class Container extends Component {

  render() {

    const styles = {
      wrapper: {
        'width': '360px',
        'height': '120px',
        'top': '100px',
        left: '100px',
        position: 'absolute',
        backgroundColor: 'lightgreen',
        borderRadius: '2.5%'
      }
    }
    return (
      <div style={styles.wrapper}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;