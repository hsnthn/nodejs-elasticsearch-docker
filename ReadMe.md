# Product Search

Product Search is a project that where you can add your products(bulk insert) and search products on single page . There are basicly 4 modules:

  - UI (localhost/index.html)
      -It shows products according to the search
      -It has desktop design and mobile design
  - Product Search Proxy
      -It gets request from UI and forwards the requests to RabbitMq 
  - RabbitMQ
      -It's a queue who manages the requests and responses asynchronously
  - Product Search Backend and Elaasticsearch 
      -There 2 parts in this module. First one is ElasticSearch. And the second one is consumer of RabbitMQ 


### Tech

Contacts uses techs to work properly:

* [NodeJS] 
* [ElasticSearch] 
* [Docker] 
* [JavaScript] 
* [Html]
* [JQuery]


### Installation

You need installed Docker on your local:

And you can use Docker commands basically.

You can run the whole modules with single command:  
* docker-compose up --build

It's important that containers have to setup order by. Because there  are dependencies.

After running the project, you can bulk insert the initial product data (product.json).
Installation:
* docker-compose up --build
* Bulk insert endpoint: http://localhost:3001/bulk
* UI endpoint: http://localhost/index.html

### Usage

There are 2 options in program.

* Bulk Insert: It inserts data from ProductSearch/product.json to ElasticSearch
* UI contains a search input. It will search for your every character if it's bigger than 3. There mobile design also. It has not autosearch. You have to push search icon. You can search exact matches with sku and ediRef. You will see fuzzy search if you want to search by name.



