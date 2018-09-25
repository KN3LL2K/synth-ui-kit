import React, { Component } from 'react';
import './App.css';
import Pot from './components/Pot';
import Container from './components/Container';
import Wrapper from './components/Wrapper';
import Draggable from './components/Draggable';
import _ from 'lodash';

const MOUSE_MOVE_MODIFIER = 0.15;

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
      decay: {
        value: 0,
        range: [0, 127],
        name: 'decay'
      },
      sustain: {
        value: 0,
        range: [0, 127],
        name: 'sustain'
      },
      release: {
        value: 0,
        range: [0, 127],
        name: 'release'
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

    this.grabBinder = this.grabBinder.bind(this);
    this.clearGrabbedParam = this.clearGrabbedParam.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {

  }

  update(delta, param) {
    const { grabbedParam } = this.state;
    param = param || this.state[grabbedParam];
    if (param) {
      let { value, range, stepped } = param;
      if (stepped) {
        // this needs adjusting or completely refactoring to
        // adjust how the 'stepped' Pot's behave when adjusting
        // currently way too 'jumpy'
        if (delta < 0 && delta > -20) {
          delta = -1;
        } else if (delta > 0 && delta < 20) {
          delta = 1;
        } else {
          delta = 0;
        }
      }
      let newValue = value + delta;
      const upperLimit = range[1];
      const lowerLimit = range[0];
      if (newValue > upperLimit) {
        newValue = upperLimit;
      } else if (newValue < lowerLimit) {
        newValue = lowerLimit;
      }
      if (newValue !== value) {
        const change = this.state;
        change[grabbedParam].value = newValue;
        const newState = _.extend(this.state, change);
        this.setState(newState);
      }
    }
  }

  grabBinder(param) {
    this.setState({grabbedParam: param});
  }

  clearGrabbedParam(e) {
    this.setState({grabbedParam: null});
  }

  render() {
    const { volume, attack, decay, sustain, release, waveform, coarse, grabbedParam } = this.state;
    return (
      <div
        className="App"
      >
        <Draggable
          update={this.update}
          clearGrabbedParam={(e) => this.clearGrabbedParam(e)}
        >
          <Container>
            <Wrapper>
              <Pot
                size={80}
                position={[0, 0]}
                parameter={waveform}
                onGrab={this.grabBinder}
              />
              <Pot
                size={80}
                position={[80, 0]}
                parameter={decay}
                onGrab={this.grabBinder}
              />
              <Pot
                size={80}
                position={[160, 0]}
                parameter={sustain}
                onGrab={this.grabBinder}
              />
              <Pot
                size={80}
                position={[240, 0]}
                parameter={release}
                onGrab={this.grabBinder}
              />
            </Wrapper>
          </Container>
        </Draggable>
      </div>
    );
  }
}

export default App;
