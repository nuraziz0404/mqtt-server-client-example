const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  console.log("MQTT client connected")
  // client.publish('presence', 'testing')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("Topic: "+String(topic)+" | Message: "+message.toString())
  client.end()
})

process.stdin.on("data", (d)=>{
  let cmd = d.toString().trim();
  if(client.connected) client.publish("presence", cmd)
})