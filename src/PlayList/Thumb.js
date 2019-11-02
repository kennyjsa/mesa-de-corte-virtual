import React, { Component } from 'react';
import VideoThumbnail from 'react-video-thumbnail';

class Thumb extends Component {
  state = {
    srcObject: null,
    videoThumb: false
  }
  componentDidMount() {
    const { item } = this.props;
    this.setDevice(item.deviceId);
  }

  getFileName = (fullPath) => {
    var filename = fullPath.replace(/^.*[\\\/]/, '');
    return filename;

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
  renderThumbVideo = () => {
    const { item } = this.props;

    return (
      <div>
        <div>{this.getFileName(item.path)}</div>
        {!item.thumbnail && 
        <VideoThumbnail
          videoUrl={item.path}
          thumbnailHandler={(thumbnail) => item.thumbnail = thumbnail}
        />
        }
        {!!item.thumbnail && <img src={item.thumbnail} />}
      </div>
    );
  }
  renderThumbCamera = () => {
    const { item } = this.props;

    return (
      <div>
        <div>{item.label}</div>
        {this.state.srcObject && <video autoPlay src={this.state.srcObject}></video>}
      </div>
    );
  }

  select = () => {
    const { item } = this.props;
    if (this.props.onSelect)
      this.props.onSelect(item);
  }
  render() {
    const { item } = this.props;
    if(!item) return null;
    return (
      <div className="thumb">

        <div className={'thumb-content'} onClick={this.select}>
          {item.type === "video" && this.renderThumbVideo()}
          {item.type === "camera" && this.renderThumbCamera()}
        </div>

      </div>
    );
  }
}

export default Thumb;
