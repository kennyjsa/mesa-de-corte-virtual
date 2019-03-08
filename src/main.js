var video = document.getElementById('video');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}


navigator.mediaDevices.enumerateDevices()
  .then(function (devices) {
    var txtDevices = '';

    devices.forEach(function (device) {
      txtDevices += (device.kind + ": " + device.label +
        " id = " + device.deviceId);
      txtDevices += '\n';
    });

    return txtDevices;
  }).then(function(texto){
    document.getElementById('texto').innerText = texto;
  })
  .catch(function (err) {
    txtDevices = (err.name + ": " + err.message);
  });
