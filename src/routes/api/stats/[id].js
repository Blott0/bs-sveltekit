import clientPromise from '$lib/mongodb-client'
import { ObjectId } from 'mongodb'

export async function get (request) {

    const dbConnection = await clientPromise
    const db = dbConnection.db("BlottBase")
    const collection = db.collection('plays')

    let result

    if (request.params.id.match(/^[0-9]*$/)) {
        result = await collection.findOne({_id: parseInt(request.params.id)})
    }
    else {
        result = await collection.findOne({_id: ObjectId(request.params.id)})
    }

    return {
        status: 200,
        body: result
    }

}