const microserviceKit = require('./microservicekit');
var express = require('express');
var request    = require('request-json');
// Official elasticsearch client
var elasticsearch = require('elasticsearch');

// App
var port = 3001;
var app  = express();

// elastic search settings
var index_name    = 'product_index';     // Must be lowercase
var type_name = 'product_doc';

// 'https://[username]:[password]@[server]:[port]/',
var client = new elasticsearch.Client({
    //default username password
  host: 'http://elastic:changeme@elasticsearch:9200'
});

// JSON request client, for extending the elasticsearch client.
var raw_client = request.newClient('http://elastic:changeme@elasticsearch:9200/' + index_name + '/');




    //bulk insert from json file
    app.get('/bulk', function(req, res) {
        //initialize elastic search
        console.log("bulk insert started..")
        client.index({
        index: index_name,
        type: type_name,
        },
        function (err) {
            client.indices.putMapping({
                index: index_name,
                type: type_name,
                body: {
                    // Setup the data model
                    properties: { 
                        sku : { type : "float",
                            index : "not-analyzed"
                        }, 
                        ediRef : { type : "string",
                            index : "not-analyzed" }, 
                        name : { type : "string" }, 
                        description : { type : "string" }, 
                        isInStock : { type : "boolean" } } 
                }
            });
        });

    //bulk insert
    var recepis = require('./products.json');

    var args = {
        index : index_name,
        type  : type_name,
        body  : {}
    };

    for (i in recepis) {
        args.body = recepis[i];

        client.index(args, function(err, es_res) {
            if (err)
                console.log(err);
        });
    }

    res.json("Done");
});


    //search
    microserviceKit
        .init()
        .then(() => {



        const searchQueue = microserviceKit.amqpKit.getQueue('search');
        searchQueue.consumeEvent('searchKeyword', (data, callback, progress, routingKey) => {
            console.log("Received: "+JSON.stringify(data));
            
            var keyword   = data.keyword;
            console.log("searhing in es keyword: "+keyword);
            var results = [];
            var lookup;
            lookup = {
        //         "_source": ["name"],
                "query": {
                    "bool": {
                        "should": [
                            {
                                "multi_match": {
                                "query": keyword,
                                "type": "phrase",
                                "fields": ["sku", "ediRef"]
                                }
                            }, {
                                "multi_match": {
                                "query": keyword,
                                "fuzziness": 'AUTO',
                                "prefix_length": 0,
                                "fields": ["name", "description"]
                                }
                            }
                        ]
                    }
                },sort: {  
                    'isInStock': {
                        order: 'desc'
                    }
                }
            };

            console.log("send request to es");
            raw_client.post('_search/', lookup, (err, res, body) => {
                callback(null, {results: body});
        });
    });



    });               
        
app.listen(port);
console.log("Server running at port: " + port)
