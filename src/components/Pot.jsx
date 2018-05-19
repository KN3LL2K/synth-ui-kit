import React, { Component } from 'react';
import _ from 'lodash';

class Pot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrabbed: false
    };
    this.handleGrab = this.handleGrab.bind(this);
    this.resetGrab = this.resetGrab.bind(this);
    this.debouncedResetGrab = _.debounce(this.resetGrab, 1000);
  }

  resetGrab() {
    this.setState({isGrabbed: false});
  }
  
  componentWillReceiveProps() {
    this.debouncedResetGrab();
  }

  handleGrab() {
    this.setState({isGrabbed: true});
    
    this.props.onGrab(this.props.parameter.name);
  }

  translate(param) {
    const { value, range, stepped, options } = param;
    let potRange = 260;
    let percentValue = value / range[1];
    if (stepped) {
      const steps = options.length;
      const step = 45;
      potRange = (steps - 1) * step;
    }
    return ((percentValue * potRange) - potRange / 2).toFixed(0);
  }

  drawNotches(option, index, steps, size) {
    const angleOffset = 45;
    const startAngle = -Math.abs((((steps - 1) * 45) / 2));
    const step = 45 * index;
    const angle = startAngle + step;
    const style = {
      height: '5%',
      width: '5%',
      left: `25%`,
      top: `25%`,
      borderRadius: '50%',
      backgroundColor: `#0f0f0f`,
      position: 'absolute',
      transformOrigin: `500% 500%`,
      transform: `rotate(${angle + angleOffset}deg)`
    };
    return (<div style={style} key={index}></div>);
  }

  render() {
    const { size, position, parameter } = this.props;
    const { isGrabbed } = this.state;

    const degrees = this.translate(parameter);
    
    const styles = {
      container: {
        left: `${position[0]}px`,
        top: `${position[1]}px`,
        height: `${size}px`,
        width: `${size}px`,
        position: 'absolute'
      },
      wrapper: {
        height: '50%',
        width: '50%',
        top: '25%',
        left: '25%',
        position: 'relative',
        transform: `rotate(${degrees}deg)`
      },
      body: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        backgroundColor: '#0f0f0f'
      },
      indicator: {
        height: '10%',
        width: '10%',
        borderRadius: '50%',
        backgroundColor: '#fafafa',
        position: 'absolute',
        left: '50%',
        top: '10%',
        transform: `translateX(-50%)`
      },
      label: {
        top: `100%`,
        left: '50%',
        fontSize: '10px',
        position: 'absolute',
        transform: `translate(-50%, -125%)`,
        userSelect: 'none'
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div 
            onMouseDown={(e) => this.handleGrab(e)}
            style={styles.body}>
            <div style={styles.indicator}></div>
          </div>
        </div>
        {parameter.options ? parameter.options.map((item, i) => this.drawNotches(item, i, parameter.options.length, size)) : '' }
        <div style={styles.label}>{parameter.options ? `${parameter.options[parameter.value]}` : isGrabbed ? `${parameter.value}` : `${parameter.name}`}</div>
      </div>
    );
  }
};

export default Pot;