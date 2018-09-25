import React, { Component } from 'react';
import './App.css';
import Pot from './components/Pot';
import Container from './components/Container';
import Wrapper from './components/Wrapper';
import Draggable from './components/Draggable';
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
      grabbedParam: null
    }

    this.bindGrabbedParam = this.bindGrabbedParam.bind(this);
    this.clearGrabbedParam = this.clearGrabbedParam.bind(this);
    this.update = this.update.bind(this);
  }

  update(delta, param) {
    const { grabbedParam } = this.state;
    param = param || this.state[grabbedParam];
    if (param) {
      let { value, range, stepped } = param;
      if (stepped) {
        delta = Math.floor(delta * MOUSE_MOVE_MODIFIER);
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
        return true;
      } else {
        return false;
      }
    }
  }

  bindGrabbedParam(param) {
    this.setState({grabbedParam: param});
  }

  clearGrabbedParam() {
    this.setState({grabbedParam: null});
  }

  render() {
    const { decay, sustain, waveform, coarse, grabbedParam } = this.state;
    const params = [ waveform, decay, sustain, coarse ];
    return (
      <Draggable
        update={this.update}
        clearGrabbedParam={this.clearGrabbedParam}
      >
        <Container>
          <Wrapper>
            {params.map((param, i) => {
              return (
                <Pot
                  key={i}
                  size={80}
                  position={[80 * i, 0]}
                  parameter={param}
                  onGrab={this.bindGrabbedParam}
                  isGrabbed={grabbedParam === param.name}
                />
              )
            })}
          </Wrapper>
        </Container>
      </Draggable>
    );
  }
}

export default App;
