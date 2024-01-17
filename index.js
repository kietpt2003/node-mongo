// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const dboper = require('./operations');
// const url = 'mongodb://localhost:27017/';
// const dbname = 'conFusion';

// const client = new MongoClient(url, { family: 4 });

// async function connectDB() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbname);
//     const collection = db.collection('dishes');

//     const results = await collection.insertOne({ "name": "Uthappizza", "description": "test" });
//     assert.notEqual(results, {}, 'Insert Fail');
//     console.log("After Insert:\n");
//     console.log(results);

//     const arrDishes = await collection.find({}).toArray();
//     assert.notEqual(arrDishes, [], "Don't have data");

//     console.log("Found:\n", arrDishes);
//     const isDrop = await db.dropCollection("dishes");
//     assert.equal(isDrop, true, 'Drop fail');

//     console.log('Drop success: ', isDrop);

//     await dboper.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes",
//         async () => {
//             await dboper.findDocuments(db, "dishes",
//                 async () => {
//                     await dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes",
//                         async () => {
//                             await dboper.findDocuments(db, "dishes",
//                                 async () => {
//                                     await dboper.removeDocument(db, { name: "Vadonut" }, "dishes",
//                                         async () => {
//                                             await db.dropCollection("dishes");
//                                             console.log("Dropped Collection: dishes");
//                                             client.close();
//                                             console.log("Client closed");
//                                         })
//                                 }
//                             )
//                         })
//                 })
//         })


//     return 'done.';
// }

// connectDB()
//     .then(console.log)
//     .catch(console.error)


const mongoose = require('mongoose');

const Nations = require('./models/nations');

const url = 'mongodb://localhost:27017/football';
const connect = mongoose.connect(url, { family: 4 });

connect.then((db) => {

    console.log('Connected correctly to server');

    let newNation = Nations({
        name: 'ABC',
    });

    newNation.save()
        .then((nation) => {
            console.log(nation);
            return Nations.find({}).exec();
        })
        .then((nations) => {
            console.log(nations);

            return Nations.deleteOne({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});
