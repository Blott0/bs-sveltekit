import clientPromise from '$lib/mongodb-client'

import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs';

export async function post (request) {

    console.log(request.body)
    // console.log(fs)
    const base64 = btoa(request.body)
    // const uri = 'mongodb://127.0.0.1:27017';
    // const options = {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    // }

    // console.log(btoa(request.body))

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const bucket = new GridFSBucket(db, {bucketName: 'imagesbucket'});

    const uploadstream = bucket.openUploadStream('myFile', {
         chunkSizeBytes: 1048576,
         metadata: { field: 'myField', value: 'myValue' }
     })

    const writetn = uploadstream.write(base64, () => {
        uploadstream.end(base64, () => {
            console.log('!!')
        })
    })

    console.log(writetn)
    // const picstream = fs.ReadStream(btoa(request.body))

    // const upload = picstream.pipe(uploadstream)

    // console.log(uploadstream)
    
    // const collection = db.collection('images')
    
    // const result = await collection.find({}).toArray()

    return {
        // status: 200,
        // headers: {"Content-Type": "application/octet-stream"},
        body: {response: 'ok'}
    }

}