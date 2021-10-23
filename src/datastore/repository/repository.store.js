// import datastore ENGINE 
const Engine = require("./repository.engine");

// extend the engine functionality with new methods
class Store extends Engine {

    async exampleFunction() {
        // some logic here...

        console.log("Example function output \n")
    }
}

// export the instance of class and create a file by that name
module.exports = new Store("store.json");