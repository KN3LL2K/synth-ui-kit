import React, { Component } from 'react';

class Pot extends Component {
  constructor(props) {
    super(props);

    this.handleGrab = this.handleGrab.bind(this);
  }

  handleGrab() {
    this.props.onGrab(this.props.parameter.name);
  }

  translateValue(param) {
    const { value, range, stepped, options } = param;
    let potRange = 260;
  
    let percentValue = value / (range[1] - range[0]);
    if (stepped) {
      const steps = options.length;
      const step = 45;
      potRange = (steps - 1) * step;
    }

    if (range[0] < 0) {
      return (percentValue * potRange).toFixed(0);
    } else {
      return ((percentValue * potRange) - potRange / 2).toFixed(0);
    }
  }

  drawNotch(index, steps, option) {
    const angleOffset = 45;
    const startAngle = -Math.abs((steps - 1) * 45 / 2);
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
    const { size, position, parameter, isGrabbed } = this.props;

    const degrees = this.translateValue(parameter);
    
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
        {parameter.options ? parameter.options.map((item, i) => this.drawNotch(i, parameter.options.length, item)) : '' }
        <div style={styles.label}>
          {parameter.options ? `${parameter.options[parameter.value]}` : isGrabbed ? `${parameter.value}` : `${parameter.name}`}
        </div>
      </div>
    );
  }
};

export default Pot;