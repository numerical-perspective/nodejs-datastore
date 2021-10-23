// import DATASTORE
const { Store } = require("./datastore");

// create a SEED OBJECT to save in the datastore
const seed = {
    name: "placeholder",
    adress: "placeholder"
}

// create async function to test datastore
async function extractData() {
    // add seed object to the datastore
    await Store.insertOne(seed);

    // save all data from datastore to data variable
    const data = await Store.findAll();

    // execute extended class function (optional)
    await Store.exampleFunction();

    // print to console all data
    console.log(data);
}

extractData();