const Repository = require("./repository.engine");

class Store extends Repository{ 

    async exampleFunction() {
        // some logic here...

        console.log("Example function output \n")
    }
}

module.exports = new Store("store.json");