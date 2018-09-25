import React, { Component } from 'react';

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
      let updated;
      if (mouseCurrent < mousePos) {
        updated = update(delta);
      } else if (mouseCurrent > mousePos) {
        updated = update(-delta);
      }
      if (updated) {
        this.setState({mousePos: mouseCurrent});
      }
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