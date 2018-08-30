var http = require('http'),
  httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({
  secure: false
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if (req.url.indexOf('sanctions-check') > 0) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH');
    proxy.web(req, res, {target: 'https://secure.underwriting-support.com:443/fst/api/fst_api.php'});
  }
});

console.log("listening on port 5050")
server.listen(process.env.PORT || 5050);