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
    // if (isDrop) {
    console.log('Drop success: ', isDrop);
    client.close();
    console.log('Client Close');
    // } else {
    //     console.log('Drop fail');
    // }
    // }
    // }

    // dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
    //     "dishes", (result) => {
    //         console.log("Insert Document:\n", result.ops);

    //         dboper.findDocuments(db, "dishes", (docs) => {
    //             console.log("Found Documents:\n", docs);

    //             dboper.updateDocument(db, { name: "Vadonut" },
    //                 { description: "Updated Test" }, "dishes",
    //                 (result) => {
    //                     console.log("Updated Document:\n", result.result);

    //                     dboper.findDocuments(db, "dishes", (docs) => {
    //                         console.log("Found Updated Documents:\n", docs);

    //                         db.dropCollection("dishes", (result) => {
    //                             console.log("Dropped Collection: ", result);

    //                             client.close();
    //                         });
    //                     });
    //                 });
    //         });
    //     });


    return 'done.';
}

connectDB()
    .then(console.log)
    .catch(console.error)

// MongoClient.connect(url, (err, client) => {

//     assert.equal(err, null);
//     console.log('Connected correctly to server');

//     const db = client.db(dbname);
//     const collection = db.collection("dishes");
//     collection.insertOne({ "name": "Uthappizza", "description": "test" },
//         (err, result) => {
//             assert.equal(err, null);

//             console.log("After Insert:\n");
//             console.log(result.ops);

//             collection.find({}).toArray((err, docs) => {
//                 assert.equal(err, null);

//                 console.log("Found:\n");
//                 console.log(docs);

//                 db.dropCollection("dishes", (err, result) => {
//                     assert.equal(err, null);

//                     client.close();
//                 });
//             });
//         });

// });
