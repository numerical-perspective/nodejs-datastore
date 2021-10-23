# NodeJS Datastore

## Problem Statement
To build CRUD functionality for a simple file datastore. 

## Solution
I have used NodeJS to build a simple Datastore.

The [Datastore engine](src/datastore/repository/repository.engine.js) was written to mimic (as closely as possible) a document-oriented architecture that is used in NoSQL databases like MongoDB or CouchDB. All the data within the datastore is stored in `JSON` format (uncompressed).

To access and communicate with the datastore, I have decided to implement a repository approach. Since this application has only one type of data (`store data`), only one repository was created - the store repository. But the datastore can easily be expanded by adding new repositories and extending the current (engine) functionality.

### Installing dependencies
To install all dependencies required to run the application, type in your terminal: 
```shell script
$ npm install
``` 

* **IMPORTANT!** This will **only** work if you have `node` and `npm` already installed on your local machine.
* If you need to install `node`, click [here](https://nodejs.org/en/download/) and follow the instructions. Node will automatically install `npm` for you.

### Running the app
To run the app, type in your terminal: 
```shell
$ npm run start
``` 

That command executes the `extractData()` function inside the `index.js` file and writes (and reads) some data to the store.

This is done just to make sure that everything is properly connected. Function ends with a `console.log` and prints the seed data to your terminal.

### Datastore engine

Datastore engine is built and exported as a class. You can utilize the class by creating an instance and providing a file name. Every time you do so you create a different datastore.

I have organized this instance creation into a repository folder where you can extend the `engine` class, and then add your methods inside. Take a look [here](src/datastore/repository).

To add your methods (or to override existing ones) you just have to write your methods inside the class that extends the parent class (the `engine` class). I have written one method for you already [here](src/datastore/repository/repository.store.js).

Datastore engine has only a few built-in methods, but it should be more than enough to get you going with storing data. You can always extend the functionality to whatever needs you may have.

Here is the list of the core engine methods:
- datastore.findAll()
- datastore.findOne()
- datastore.findOneBy()
- datastore.insertOne()
- datastore.updateOne()
- datastore.deleteOne()
- datastore.deleteAll()

In this example, I've exported the datastore under the name `datastore`, but you can use any name you want. Just make sure you export it under your desired name from `./datastore/index.js` file. All exports are defined from there.