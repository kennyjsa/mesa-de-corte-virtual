import React, { Component } from 'react';
import { Button, Dialog } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const { dialog } = require('electron').remote;


//import './index.css';
let controle=1;
class SelectMedia extends Component {
  state = {
    devices: [],
    errorText: null,
    srcObject: null
  }
  openFile = () => {
    const files = dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!files) return;

    var medias = files.map(x => ({
      key: controle++,
      type: "video",
      path: x
    }));

    this.props.onAddMedia(medias);
  }

  selectCamera = () => {
    const { srcObject } = this.state;

    var device = this.state.devices.find(x => x.deviceId === this.state.deviceSelected);
    const result = {
      key: controle++,
      type: "camera",
      ...device
    };

    this.props.onAddMedia([result]);
  }

  componentDidMount() {
    this.refreshVideoDevices();
  }
  refreshVideoDevices = () => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const list = [];
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            list.push({
              deviceId: device.deviceId,
              kind: device.kind,
              label: device.label
            });
          }

        });

        this.setState({ devices: list, errorText: null });
      })
      .catch((err) => {
        this.setState({ devices: [], errorText: (err.name + ": " + err.message) });
      });
  }

  setDevice = (e) => {
    const myPreferredCameraDeviceId = e.target.value;
    console.log(myPreferredCameraDeviceId)
    //alert(myPreferredCameraDeviceId);
    navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: myPreferredCameraDeviceId } } })

      .then((stream) => {
        console.log("sucesso")
        /*if (window.stream) {
          window.stream.getTracks().forEach(function (track) {
            track.stop();
          });

        }*/

        this.setState({ deviceSelected: myPreferredCameraDeviceId, srcObject: window.URL.createObjectURL(stream) });
        //video.srcObject = stream;
        //Windows.stream = stream;
      }).catch((err) => {
        console.log('err', err);
        this.setState({ deviceSelected: null, errorText: (err.name + ": " + err.message) });
      });
  }
  closeModal = () => {
    console.log('closeModal');
    this.props.closeAddMedia();
  }

  render() {
    const { errorText, devices, srcObject } = this.state;
    return (
      <Dialog isOpen onClose={this.closeModal} title="Adicionar Mídia">
        <br />



        <div>
          <div className="col-50">

          </div>
          <Button onClick={this.openFile}>Add Arquivo</Button>
          <Button icon="refresh" onClick={this.refreshVideoDevices}>Carregar Dispositivos de video</Button>

          {
            !!errorText &&
            <p style={{ color: 'red' }}>{errorText}</p>
          }
          <br />
          {(devices && devices.length > 0) &&
            <div className="bp3-select">
              <select onChange={this.setDevice}>
                <option>**Selecione**</option>
                {devices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.kind}: {device.label}
                  </option>
                ))}
              </select>
            </div>
          }
          <div className="video-container">
            {!!srcObject &&
              <video id="video" src={srcObject} autoPlay />
            }
            {!!srcObject &&
              <Button onClick={this.selectCamera}>Selecionar Camera</Button>
            }

          </div>

        </div>


      </Dialog>
    );
  }
}

export default SelectMedia;
