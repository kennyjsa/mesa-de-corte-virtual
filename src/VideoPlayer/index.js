import React, { Component } from 'react';
import './videoPlayer.css';

const { ipcRenderer } = require('electron');

class VideoPlayer extends Component {
  state = {
    item: {},
    srcObject: null
  }
  componentDidMount() {
    ipcRenderer.on('execute-transmition-reply', (event, arg) => {
      this.setState({ item: arg });
      console.log(arg)
      if(arg && arg.deviceId)
        this.setDevice(arg.deviceId);
    })

  }

  execute = (item) => {
    this.setState({ item });
  }

  renderVideo = () => {
    return (
      <video autoPlay src={this.state.item.path}></video>
    );

  }

  setDevice = (myPreferredCameraDeviceId) => {
    //alert(myPreferredCameraDeviceId);
    navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: myPreferredCameraDeviceId } } })

      .then((stream) => {
        /*if (window.stream) {
          window.stream.getTracks().forEach(function (track) {
            track.stop();
          });

        }*/

        this.setState({ srcObject: window.URL.createObjectURL(stream) });
        //video.srcObject = stream;
        //Windows.stream = stream;
      }).catch((err) => {
        console.log('err', err);
        this.setState({ deviceSelected: null, errorText: (err.name + ": " + err.message) });
      });
  }

  renderCamera = () => {
    return (
      <video autoPlay src={this.state.srcObject}></video>
    );
  }

  render() {
    const { item } = this.state;
    
    if(!item) return null;

    return (
      <div className="video-player">
        {item.type === "video" && this.renderVideo()}
        {item.type === "camera" && this.renderCamera()}
      </div>
    );
  }
}

export default VideoPlayer;
