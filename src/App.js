import React, { Component } from 'react';
import './App.css';
import Pot from './components/Pot';
import Container from './components/Container';
import Wrapper from './components/Wrapper';
import _ from 'lodash';

const MOUSE_MOVE_MODIFIER = 0.125;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      volume: {
        value: 0,
        range: [0, 100],
        name: 'volume'
      },
      attack: {
        value: 0,
        range: [0, 127],
        name: 'attack'
      },
      coarse: {
        value: 0,
        range: [-63, 64],
        name: 'coarse'
      },
      waveform: {
        value: 0,
        range: [0, 3],
        stepped: true,
        options: ['sine', 'square', 'saw', 'noise'],
        name: 'waveform'
      },
      mousePos: 0,
      isGrabbed: false,
      grabbedParam: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.grabBinder = this.grabBinder.bind(this);
    this.release = this.release.bind(this);
  }

  handleClick(e) {
    this.setState({mousePos: e.clientY, isGrabbed: true});
  }

  mouseMove(e) {
    const { isGrabbed, mousePos, grabbedParam } = this.state
    const mouseCurrent = e.clientY;
    if (isGrabbed && grabbedParam) {
      const { value: startValue, range, stepped } = this.state[grabbedParam];
      const upperLimit = range[1];
      const lowerLimit = range[0];
      let newValue = startValue;
      let diff = Math.abs(mouseCurrent - mousePos);
      if (stepped) {
        diff = Math.floor(Math.abs(mouseCurrent - mousePos) * MOUSE_MOVE_MODIFIER);
      }
      if (mouseCurrent < mousePos) {
        newValue = startValue + diff;
      } else if (mouseCurrent > mousePos) {
        newValue = startValue - diff;
      }
      if (newValue > upperLimit) {
        newValue = upperLimit;
      } else if (newValue < lowerLimit) {
        newValue = lowerLimit;
      }

      if (newValue !== startValue) {
        const change = this.state;
        change[grabbedParam].value = newValue;
        change.mousePos = mouseCurrent;
        const newState = _.extend(this.state, change);
        this.setState(newState);
      }
    }
  }

  release(e) {
    this.setState({
      isGrabbed: false,
      grabbedParam: null
    });
  }

  grabBinder(param) {
    this.setState({grabbedParam: param});
  }

  render() {
    const { volume, attack, waveform, coarse } = this.state
    return (
      <div
      onMouseDown={(e) => this.handleClick(e)}
      onMouseMove={(e) => this.mouseMove(e)}
      onMouseUp={(e) => this.release(e)}
      className="App">
      <Container>
        <Wrapper>
          <Pot
            size={80}
            position={[0, 0]}
            parameter={volume}
            onGrab={this.grabBinder}
          />
           <Pot
            size={80}
            position={[80, 0]}
            parameter={attack}
            onGrab={this.grabBinder}
          />
          <Pot
            size={80}
            position={[160, 0]}
            parameter={waveform}
            onGrab={this.grabBinder}
          />
          <Pot
            size={80}
            position={[240, 0]}
            parameter={coarse}
            onGrab={this.grabBinder}
          />
        </Wrapper>
      </Container>
       
      </div>
    );
  }
}

export default App;
