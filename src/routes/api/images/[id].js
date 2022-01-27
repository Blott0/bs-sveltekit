import clientPromise from '$lib/mongodb-client'
import { GridFSBucket, ObjectId } from 'mongodb';

export async function get(request) {
    console.log(request.params)

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")

    const bucket = new GridFSBucket(db, {bucketName: 'imagesbucket'});

    const downloadstream = bucket.openDownloadStream(new ObjectId('61f2c587ca02f87a999060f0'))

    return {
        body: request.params
    }
}