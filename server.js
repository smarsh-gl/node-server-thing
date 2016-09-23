var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8888, function() {
    console.log ( "starting" );
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
var global_data = {};


io.on('connection', function (socket) {
    socket.on( "data", function( data ) {
        global_data = Object.assign( global_data, data );
        console.log( "dataChange", global_data );
        io.emit( "dataChange", global_data ); 
    } );


    socket.on( "getData", function() {
        io.emit( "dataChange", global_data );
    })
});