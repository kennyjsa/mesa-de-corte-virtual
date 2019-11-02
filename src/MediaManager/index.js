import React, { Component } from 'react';
import Thumb from '../PlayList/Thumb';
import { Button } from '@blueprintjs/core';

import './mediaManager.css';

const { ipcRenderer } = require('electron');

class VideoPlayer extends Component {
  
  state={
    primary: null,
    secondary: null,
    fundoPretoVisible: false
  }
  
  fade=()=>{
    var newPrimary=this.props.secondary;
    var newSecondary=this.props.primary || this.props.secondary;

    this.popupExecute(newPrimary);
    
    this.setState({
      primary: newPrimary,
      secondary: newSecondary
    });

    this.props.setPrimary(newPrimary);
    this.props.setSecondary(newSecondary);
  }
  fundoPreto=()=>{
    this.setState({ fundoPretoVisible:!this.state.fundoPretoVisible }, ()=>{
      this.popupExecute(this.state.fundoPretoVisible?{}:this.state.primary);

    })
  }

  

  
  popupExecute=(item)=>{
    console.log('execute-transmition', item)
    ipcRenderer.send('execute-transmition', item) // prints "pong"
  }
  
  



  renderControls = () => {
    return (
      <div className="controls" style={{ width: '120px' }}>
        <Button onClick={this.fundoPreto}>Fundo Preto</Button>
        <br/><br/><br/>
        <Button onClick={this.fade}>Fade</Button>
      </div>
    );
  }

  renderSecondary = () => {
    const {secondary} = this.props;
    return (
      <div className="media" style={{ width: '100%' }}>
        {secondary && <Thumb item={secondary} />}
      </div>
    );
  }

  renderPrimary = () => {
    const {primary} = this.props;
    return (
      <div className="media" style={{ width: '100%' }}>
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
