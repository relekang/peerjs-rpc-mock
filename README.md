# peerjs-rpc-mock [![Build status](https://ci.frigg.io/badges/relekang/peerjs-rpc-mock/)](https://ci.frigg.io/relekang/peerjs-rpc-mock/last/) [![Coverage status](https://ci.frigg.io/badges/coverage/relekang/peerjs-rpc-mock/)](https://ci.frigg.io/relekang/peerjs-rpc-mock/last/) [![Dependency Status](https://david-dm.org/relekang/peerjs-rpc-mock.svg)](https://david-dm.org/relekang/peerjs-rpc-mock)

Mock for peerjs-rpc, mainly built for nodejs simulations

## Installation

```
npm install relekang/peerjs-rpc-mock
```

## Usage
Either just use it directly:
```javascript
var RPC = require('peerjs-rpc-mock');

var n1 = new RPC('n1', {});
var n2 = new RPC('n2', {add: function (a, b, callback) { callback(a + b); }});

n1.invoke('n2', 'add', [40, 2])
  .then(function(result) {
    console.log(result);
  });

//=> 42

```
or use mock-require before requiring your dependencies using peerjs-rpc
```javascript
var mr = require('mock-require');
mr('peerjs-rpc', require('peerjs-rpc-mock'));

var YourModule = require('your-module');
```

----------------------

MIT © Rolf Erik Lekang
