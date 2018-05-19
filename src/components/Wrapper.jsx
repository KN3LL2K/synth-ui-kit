import React, { Component } from 'react';

class Wrapper extends Component {

  render() {

    const styles = {
      wrapper: {
        'width': '320px',
        'height': '80px',
        top: '20px',
        left: '20px',
        position: 'relative',
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

export default Wrapper;