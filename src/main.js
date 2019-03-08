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
    devices.forEach(function (device) {
      texto += (device.kind + ": " + device.label +
        " id = " + device.deviceId);
        texto += '\n';
    });

    document.getElementById('texto').innerText = texto;
  })
  .catch(function (err) {
    document.getElementById('texto').innerText = (err.name + ": " + err.message);
  });
