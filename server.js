const mqttServer = require('mqtt-server');

const servers = mqttServer({
  mqtt: 'tcp://localhost:1883',
  mqttws: 'ws://localhost:1884',
}, {
  emitEvents: true // default
}, function (client) {
  client.on("connect", function () {
    console.log("client connected");
  });
  client.on('disconnected', function () {
    console.log("client disconnected")
  })
  client.on('error', function (...e) {
    // console.log([...e])
  })
  client.on("data", function (res) {
    let { topic, payload } = res
    if (topic) {
      let msg = payload.toString()
      console.log(topic + ":" + msg)
    }
    else {
      client.connack({
        returnCode: 0,
      });
    }
  });
});

servers.listen(function () {
  console.log('MQTT server listening!');
});