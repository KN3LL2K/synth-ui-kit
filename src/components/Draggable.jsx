import React, { Component } from 'react';
import _ from 'lodash';

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePos: 0,
      isGrabbed: false
    }

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  mouseDown(e) {
    this.setState({
      mousePos: e.clientY,
      isGrabbed: true
    });
  }

  mouseMove(e) {
    const { update } = this.props;
    const { isGrabbed, mousePos } = this.state;
    const mouseCurrent = e.clientY;
    if (isGrabbed) {
      const delta = Math.abs(mouseCurrent - mousePos);
      if (mouseCurrent < mousePos) {
        update(delta);
      } else if (mouseCurrent > mousePos) {
        update(-delta);
      }
      this.setState({mousePos: mouseCurrent});
    }
  }

  mouseUp(e) {
    const { clearGrabbedParam } = this.props;
    clearGrabbedParam(e);
    this.setState({
      isGrabbed: false
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div 
        style={{
          height: '100vh',
          width: '100vw'
        }}
        onMouseDown={(e) => this.mouseDown(e)}
        onMouseMove={(e) => this.mouseMove(e)}
        onMouseUp={(e) => this.mouseUp(e)}
      >
        { children }
      </div>
    )
  }
}

export default Draggable;