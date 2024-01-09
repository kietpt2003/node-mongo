const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

const client = new MongoClient(url, { family: 4 });

async function connectDB() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbname);
    const collection = db.collection('dishes');

    const results = await collection.insertOne({ "name": "Uthappizza", "description": "test" });

    // if (results) {
    assert.notEqual(results, {}, 'Insert Fail');
    console.log("After Insert:\n");
    console.log(results);

    const arrDishes = await collection.find({}).toArray();
    assert.notEqual(arrDishes, [], "Don't have data");
    // if (arrDishes.length !== 0) {
    console.log("Found:\n", arrDishes);
    const isDrop = await db.dropCollection("dishes");
    assert.equal(isDrop, true, 'Drop fail');
    // // if (isDrop) {
    console.log('Drop success: ', isDrop);
    // client.close();
    // console.log('Client Close');
    // } else {
    //     console.log('Drop fail');
    // }
    // }
    // }

    await dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes",
        async () => {
            await dboper.findDocuments(db, "dishes",
                async () => {
                    await dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes",
                        async () => {
                            await dboper.findDocuments(db, "dishes",
                                async () => {
                                    await dboper.removeDocument(db, { name: "Vadonut" }, "dishes",
                                        async () => {
                                            await db.dropCollection("dishes");
                                            console.log("Dropped Collection: dishes");
                                            client.close();
                                            console.log("Client closed");
                                        })
                                }
                            )
                        })
                })
        })


    return 'done.';
}

connectDB()
    .then(console.log)
    .catch(console.error)