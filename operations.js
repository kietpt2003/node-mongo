const assert = require('assert');

exports.insertDocument = async (db, document, collection, callback) => {
    const coll = db.collection(collection);
    const result = await coll.insertOne(document);
    assert.notEqual(result, {}, 'Insert Fail');
    console.log("Inserted " + result.insertedId +
        " documents into the collection " + collection);
    await callback();
};

exports.findDocuments = async (db, collection, callback) => {
    const coll = db.collection(collection);
    const arrDishes = await coll.find({}).toArray();
    assert.notEqual(arrDishes, [], "Don't have data");
    console.log("Found Documents:\n", arrDishes);
    callback();
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);
    });
};

exports.updateDocument = async (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    const updateDish = await coll.updateOne(document, { $set: update }, null);
    assert.notEqual(updateDish, {});
    console.log("Updated the document with ", updateDish);
    callback();
};


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