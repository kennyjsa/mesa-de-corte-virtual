var video = document.getElementById('video');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}


navigator.mediaDevices.enumerateDevices()
  .then(function (devices) {
    var texto = '';
    devices.forEach(function (device){
      if(device.kind =='videoinput') {
      texto += '<option vslue="' +device.deviceId+'">' + (device.kind + ": " + device.label + " id = " + device.deviceId) + '</option>';
     } 
      
    });

    document.getElementById('texto').innerHTML = texto;
  })
  .catch(function (err) {
    document.getElementById('texto').innerText = (err.name + ": " + err.message);
  });


  function setDevice(e){
    var myPreferredCameraDeviceId = e.target.value;
    alert(myPreferredCameraDeviceId);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: myPreferredCameraDeviceId } }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }
  }
