const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

module.exports = class Engine {
    constructor(filename) {
        if (!filename) {
            throw new Error("Datastore filename required!");
        }

        // apsolute path to the filename (within the data-storage folder)
        this.filename = path.join(__dirname, "..", "data", filename);

        try {
            // check if the datastore file exists 
            fs.accessSync(this.filename);
        } catch (err) {
            // if the file doesn't exist - create new file with an emtpy array
            fs.writeFileSync(this.filename, "[]")
        }
    }

    _randomId() {
        return crypto.randomBytes(6).toString("hex");
    }

    async _writeAll(records) {
        // convert records data to a JSON string
        const data = JSON.stringify(records, null, 2);

        // write JSON to the datastore
        await fs.promises.writeFile(this.filename, data);
    }

    async findAll() {
        // read the datastore and save the content to the data variable
        const data = await fs.promises.readFile(this.filename);

        // since data variable contains a long string, parse data to JSON
        return JSON.parse(data);
    }

    async findOne(id) {
        // read the datastore and save the content to the data variable
        const data = await this.findAll();

        // return the element with that ID (or return undefined)
        return data.find(record => record.id === id);
    }

    /**
     * Function that finds one element based on filters passed in. 
     * All filters are key-value pairs in an object
     * 
     * @param {Object} filters - key-value pair(s) we want to sort by
     * @returns {Object} - return filtered object
    */
    async findOneBy(filters) {
        // read the datastore and save the content to the data variable
        const data = await this.findAll();

        for (let record of data) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) { return record; }
        }
    }

    async insertOne(object) {
        // read the datastore and save the content to the data variable
        const data = await this.findAll();

        // add a unique id to the new object
        object.id = this._randomId();

        // add a createdAt timestamp 
        object.createdAt = Date.now();

        // add the modified object to all datastore data
        data.push(object);

        // write new data to the datastore
        await this._writeAll(data);

        // return the user we just made
        return object;
    }

    async deleteOne(id) {
        // read the datastore and save the content to the data variable
        const data = await this.findAll();

        // filter out the element with specified id
        const newData = data.filter(record => record.id !== id);

        // write new data to the datastore (without element with that id)
        await this._writeAll(newData);
    }

    async deleteAll() {
        // delete all data and write an empty array to the datastore
        await this._writeAll([]);
    }

    async updateOne(id, attributes) {
        // read the datastore and save the content to the data variable
        const data = await this.findAll();

        // find record with target id (or return undefined)
        const record = data.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        // update lastUpdated to match now()
        record.lastUpdated = Date.now();

        // update record object with provided attributes
        // NOTE - record object is STILL part of data variable
        Object.assign(record, attributes);

        // write new data to the datastore
        await this._writeAll(data);
    }
}