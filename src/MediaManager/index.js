import React, { Component } from 'react';
import Thumb from '../PlayList/Thumb';
import { Button } from '@blueprintjs/core';

import './mediaManager.css';

const { ipcRenderer } = require('electron');

class VideoPlayer extends Component {
  
  state={
    primary: null,
  }
  
  fade=()=>{
    this.setPrimary();
  }

  setPrimary(){
    var newSecondary=this.state.primary;
    
    this.setState({primary: this.props.secondary});
    this.popupExecute(this.props.secondary);
    
    this.props.setSecondary(newSecondary);
  }

  

  
  popupExecute=(item)=>{
    console.log('execute-transmition', item)
    ipcRenderer.send('execute-transmition', item) // prints "pong"

  }
  
  



  renderControls = () => {
    return (
      <div style={{ width: '33%' }}>
        <Button onClick={this.fade}>Fade</Button>
      </div>
    );
  }

  renderSecondary = () => {
    const {secondary} = this.props;
    return (
      <div style={{ width: '33%' }}>
        {secondary && <Thumb item={secondary} />}
      </div>
    );
  }

  renderPrimary = () => {
    const {primary} = this.state;
    return (
      <div style={{ width: '33%' }}>
        {primary && <Thumb item={primary} />}
      </div>
    );
  }

  render() {

   return (
      <div className="media-manager">
        {this.renderSecondary()}

        {this.renderControls()}

        {this.renderPrimary()}

      </div>
    );
  }
}

export default VideoPlayer;
