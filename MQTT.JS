/*
public broker and topic you can use for testing.

	var MQTTbroker = 'broker.mqttdashboard.com';
	var MQTTport = 8000;
	var MQTTsubTopic = 'dcsquare/cubes/#'; //works with wildcard # and + topics dynamically now

*/

//settings BEGIN
//var MQTTbroker = 'ws://test.mosquitto.org';
//var MQTTport = 8080;
//var MQTTsubTopic = 'BQ/txt/'; //works with wildcard # and + topics dynamically now
//var temp_topic = "BQ/temp";
//var humi_topic = "BQ/humidity";
//var klima_status_topic = "klima";
//var txt_topic = "BQ/txt"
//var retain_flag = true;

var user_name = "";
var pass = "";

//settings END

const mqttBroker = 'wss://test.mosquitto.org:8081'; // Change this to your MQTT broker address
const mqttOptions = {
  clientId: 'web-client-' + Math.random().toString(16).substr(2, 8),
  // Omit username and password for brokers that don't require authentication
};

const temp_topic = 'temperatura'; // Change this to your actual temperature topic

function init_mqtt() {
  const client = mqtt.connect(mqttBroker, mqttOptions);

  client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe(temp_topic);
    console.log('Subscribed to topic:', temp_topic);
  });

  client.on('message', function (topic, message) {
    onMessageArrived({ destinationName: topic, payloadString: message.toString() });
  });
}

function onMessageArrived(message) {
  console.log(message.destinationName, '', message.payloadString);

  if (message.destinationName === temp_topic) {
    const temperatureElement = document.getElementById("temperatura");
    temperatureElement.innerHTML = message.payloadString;
  }
}  
                