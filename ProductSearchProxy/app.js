const microserviceKit = require('./microservicekit');
var express = require('express');

// App
var port = 3000;
var app  = express();


microserviceKit
        .init()
        .then(() => {
            const searchQueue = microserviceKit.amqpKit.getQueue('search');
            app.get('/search/quick', function(req, res) {

		res.setHeader('Access-Control-Allow-Origin', '*');
    		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    

                 var keyword   = req.query.keyword;
                 console.log("Message sending to queue with keyword:"+keyword)
                 
                    searchQueue.sendEvent('searchKeyword', { keyword: keyword }, { persistent: true })
                    .then(results => res.json(results));
        });
;
});

app.listen(port);
console.log("Server running at port: " + port)
