/*
const constraints = {
  video: true
};

const video = document.querySelector('video');

navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {video.srcObject = stream});
*/

navigator.mediaDevices.enumerateDevices()
  .then(function (devices) {
    var texto = '<option>Selecione... </option>';
    devices.forEach(function (device){
      if(device.kind =='videoinput') {
      texto += '<option value="' +device.deviceId+'">' + (device.kind + ": " + device.label + " id = " + device.deviceId) + '</option>';
     } 
      
    });

    document.getElementById('texto').innerHTML = texto;
  })
  .catch(function (err) {
    document.getElementById('texto').innerText = (err.name + ": " + err.message);
  });


  function setDevice( myPreferredCameraDeviceId ){
    //alert(myPreferredCameraDeviceId);
    navigator.mediaDevices.getUserMedia( {video: {deviceId: { exact: myPreferredCameraDeviceId } }} ).
  then((stream) => {
      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
      track.stop();

    });

  }
      video.srcObject = stream;
      Windows.stream = stream;
    });


  }

