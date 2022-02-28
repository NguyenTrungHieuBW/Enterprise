const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = "mongodb+srv://hieunt:EarthDefender@cluster0.vwoqw.mongodb.net/test"
const DATABASE_NAME = 'Enterprise'

async function getDB() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function deleteObject(id,collectionName){
    const dbo = await getDB()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDB();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDocumentById(id, collectionName){
    const dbo = await getDB()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

async function getDocument(collectionName){
    const dbo = await getDB()
    const results = await dbo.collection(collectionName).find({}).toArray();
    return results;
}

async function getCommentByIdea(id, collectionName){
    const dbo = await getDB()
    const result = await dbo.collection(collectionName).find({idea:id}).toArray();
    return result;
}

module.exports = {deleteObject, insertObject,updateDocument, getDocumentById, getDocument,
    getCommentByIdea}