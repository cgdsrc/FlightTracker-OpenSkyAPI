const express = require("express");
const app = express();


const from_api = require("./api");

const url =
  "https://opensky-network.org/api/states/all?lamin=45.8389&lomin=5.9962&lamax=47.8229&lomax=10.5226";

const server = app.listen(4000, () => {
  console.log("Listening on port: 4000");
});

var io = require('socket.io')(server);


io.on('connection', (socket) =>{
  var requestLoop = setInterval(function(){

    
    from_api.From_Api(url)
      .then(response => {
        var result = (response.states);
        console.log(result);
        socket.emit('getflight',result);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, 10000);
});